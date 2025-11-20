describe('Product API Tests', () => {
  const baseUrl = 'https://automationexercise.com/api';

  it('GET - Fetches all products successfully', () => {
    cy.request('GET', `${baseUrl}/productsList`)
      .then((response) => {
        expect(response.status).to.eq(200);
        
        // Parse the response body as it comes as string
        const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
        
        expect(body.responseCode).to.eq(200);
        expect(body.products).to.be.an('array');
        expect(body.products.length).to.be.greaterThan(30); // Has 30+ products
        
        // Verify first product structure
        expect(body.products[0]).to.have.property('id');
        expect(body.products[0]).to.have.property('name');
        expect(body.products[0]).to.have.property('price');
      });
  });

  it('GET - Fetches all brands', () => {
    cy.request('GET', `${baseUrl}/brandsList`)
      .then((response) => {
        expect(response.status).to.eq(200);
        
        const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
        expect(body.responseCode).to.eq(200);
        expect(body.brands).to.be.an('array');
      });
  });

  it('POST - Searches for products', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/searchProduct`,
      form: true,
      body: {
        search_product: 'top'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      expect(body.responseCode).to.eq(200);
      expect(body.products).to.be.an('array');
      expect(body.products.length).to.be.greaterThan(0);
      
      // Verify products contain 'top' in name
      const productNames = body.products.map(p => p.name.toLowerCase());
      const hasTopProducts = productNames.some(name => name.includes('top'));
      expect(hasTopProducts).to.be.true;
    });
  });

  it('POST - Creates user account', () => {
    const timestamp = Date.now();
    const testEmail = `testuser${timestamp}@example.com`;
    
    cy.request({
      method: 'POST',
      url: `${baseUrl}/createAccount`,
      form: true,
      body: {
        name: 'Test User',
        email: testEmail,
        password: 'Test123!',
        title: 'Mr',
        birth_date: '15',
        birth_month: '5',
        birth_year: '1990',
        firstname: 'Test',
        lastname: 'User',
        company: 'Test Company',
        address1: '123 Test St',
        address2: 'Apt 4',
        country: 'United States',
        zipcode: '12345',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      // User might exist or be created - both are valid API responses
      expect([200, 201]).to.include(body.responseCode);
    });
  });

  it('POST - Verifies login with invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/verifyLogin`,
      form: true,
      body: {
        email: 'invalid@test.com',
        password: 'wrongpassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      expect(body.responseCode).to.eq(404); // Invalid credentials
      expect(body.message).to.include('User not found');
    });
  });
});
