// test case one
describe('Homepage validation', () => {
  it('should verify homepage loads and header elements are visible', () => {
    cy.visit('https://automationexercise.com')
  cy.url().should('include','automationexercise.com')
  cy.get('.logo img').should('be.visible')
  cy.get('.shop-menu').should('be.visible')
  cy.contains('Signup / Login').should('be.visible')
  })
})

// Checks that the store address landing page opens completely and elements like the logo and header nav menu are visible.

//test case two
describe('User registration and Cleanup', () => {
  it('should successfully register and delete a new user account', () => {

    const uniqueEmail = `user_${Date.now()}@test.com`;

    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').click();
    
    cy.get('[placeholder="Name"]').type('MaryMacharia');
    cy.get('.signup-form [placeholder="Email Address"]').type(uniqueEmail);
    cy.get('.signup-form button').click();
    
    cy.get('#id_gender1').check();
    cy.get('#password').type('@machariaMary2026');
    cy.get('[name="days"]').select('15');
    cy.get('[name="months"]').select('January');
    cy.get('[name="years"]').select('2000');

    cy.get('#first_name').type('Mary');
    cy.get('#last_name').type('Macharia');
    cy.get('#company').type('Nexavi AI');
    cy.get('#address1').type('34 1001 thika');
    cy.get('#country').select('Singapore'); // Note: 'Kenya' is not an option in this site's dropdown, changed to Singapore to avoid crash
    cy.get('#state').type('Nairobi');
    cy.get('#city').type('Karen');
    cy.get('#zipcode').type('1001');
    cy.get('#mobile_number').type('+254797488020');

    cy.get('form').contains('Create Account').click();

    cy.contains('Account Created!').should('be.visible');

    cy.get('.btn-primary').contains('Continue').click();

    cy.contains('Logged in as MaryMacharia').should('be.visible');

    cy.contains('Delete Account').click();

    cy.contains('Account Deleted!').should('be.visible');
    
    cy.get('.btn-primary').contains('Continue').click();
  });
});

//Uses a dynamic email timestamp variant to create an account, fills out details, asserts creation confirmation, and deletes the profile at the end for test environment cleanliness.

//test case three
describe('Login With Valid Credentials', () => {
  // Store dynamic credentials that work across multiple steps
  const uniqueEmail = `user_${Date.now()}@test.com`;
  const password = '@machariaMary2026';
  const username = 'marymacharia';

  // This block runs ONCE before the actual test starts to set up our account
  before( () => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Signup / Login').click();
    cy.get('[placeholder="Name"]').type(username);
    cy.get('.signup-form [placeholder="Email Address"]').type(uniqueEmail);

    cy.get('.signup-form button').click();
    
    cy.get('#id_gender1').should('be.visible').check();
    cy.get('#password').type(password);
    cy.get('#first_name').type('Mary');
    cy.get('#last_name').type('Macharia');
    cy.get('#address1').type('34 1001 thika');
    cy.get('#country').select('Singapore');
    cy.get('#state').type('Nairobi');
    cy.get('#city').type('Karen');
    cy.get('#zipcode').type('1001');
    cy.get('#mobile_number').type('+254797488020');
    cy.get('form').contains('Create Account').click();

    cy.get('.btn-primary').contains('Continue').click();
    
    cy.contains('Logout').click();
  });

   it('should log in and log out successfully using valid credentials', () =>{
    cy.visit('https://automationexercise.com');
     cy.contains('Signup / Login').click();

    cy.get('.login-form [placeholder="Email Address"]').type(uniqueEmail);
    cy.get('[placeholder="Password"]').type(password);

    cy.get('[data-qa="login-button"]').click();

    cy.contains(`Logged in as ${username}`).should('be.visible');

    cy.contains('Logout').click();

    cy.url().should('include', '/login');

    cy.contains('Login to your account').should('be.visible');
  });
});

//Utilizes a custom, reusable macro shortcut (cy.login) to sign into the system with established data parameters and performs a clean validation sequence before logging back out.

///test case four
describe('Login With Invalid Credentials', () => {
  it('should display an error message when logging in with invalid credentials', () => {
    cy.visit('https://automationexercise.com/');
    cy.contains('Signup / Login').click();

    cy.get('.login-form [placeholder="Email Address"]').type('completely_fake_email@nonexistent.com');
    cy.get('[placeholder="Password"]').type('WrongPassword123!');

    cy.get('[data-qa="login-button"]').click();

    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
});

// Intentionally triggers an unauthorized entry sequence to ensure the system application correctly surfaces validation error banners.

//test case five
describe('Test Case 5: Search for a Product', () => {
  it('should search for dresses and verify matching results are displayed', () => {
    cy.visit('https://automationexercise.com');

    cy.contains('Products').click();

    cy.url().should('include', '/products');
    cy.contains('All Products').should('be.visible');

    cy.get('#search_product').type('dress');

    cy.get('#submit_search').click();

    cy.contains('Searched Products').should('be.visible');

    cy.get('.features_items').should('contain.text', 'Dress');
  });
});

//Inputs text keywords inside the store catalog directory filter input field to check that relevant search results load correctly.


//test case six
describe('View Product Details', () => {
  it('should navigate to the first product details page and verify all required specifications', () => {
    cy.visit('https://automationexercise.com');

    cy.contains('Products').click();
    cy.url().should('include', '/products');

    cy.get('.choose > .nav > li > a').first().click();
    
    cy.url().should('include', '/product_details/');

    cy.get('.product-information h2').should('be.visible');

    cy.get('.product-information p').contains('Category:').should('be.visible');

    cy.get('.product-information span span').should('be.visible');

    cy.contains('Availability:').should('be.visible');

    cy.contains('Condition:').should('be.visible');

    cy.contains('Brand:').should('be.visible');
  });
});

//Inputs text keywords inside the store catalog directory filter input field to check that relevant search results load correctly.

//test case seven
describe('Add Product to Cart', () => {
  it('should add the first product to the cart and verify its details inside the cart page', () => {
    cy.visit('https://automationexercise.com');

    cy.contains('Products').click();
    cy.url().should('include', '/products');

    cy.get('.add-to-cart').first().click();

    cy.get('.modal-body').contains('View Cart').click();

    cy.url().should('include', '/view_cart');

    cy.get('#cart_info_table tbody tr').should('be.visible');

    cy.get('.cart_price').should('be.visible');
    cy.get('.cart_quantity').should('be.visible');
    cy.get('.cart_total').should('be.visible');
  });
});

// Verifies that clicking an item item card asset stores the item details in the persistence cart array and displays it inside the summary table layout rows.

//test case eight
describe('Submit Contact Us Form', () => {
  it('should fill out the contact form, handle the browser alert, and submit successfully', () => {
    cy.visit('https://automationexercise.com');

    cy.contains('Contact Us').click();
    cy.url().should('include', '/contact_us');

    cy.get('[data-qa="name"]').type('Mary Macharia');
    cy.get('[data-qa="email"]').type('mary@nexaviai.com');
    cy.get('[data-qa="subject"]').type('Book an appointment');
    cy.get('[data-qa="message"]').type('Hello, I wanted to ask if I can book an appointment over the weekend.');


    cy.get('input[name="upload_file"]').selectFile({
      contents: Cypress.Buffer.from('just a file content'),
      fileName: 'test_document.txt',
      mimeType: 'text/plain'
    });

    cy.on('window:confirm', (text) => {
      expect(text).to.include('Press OK to proceed');
      return true;
    });

    cy.get('[data-qa="submit-button"]').click();

    cy.get('.status.alert-success').should('be.visible')
      .and('contain.text', 'Success! Your details have been submitted successfully.');
  });
});

// Fills out inquiry details, attaches a virtual file stream object directly to the file input system node, and logs a native window interceptor hook to handle the browser alert popups seamlessly.

//challanges
describe('Challenge Tasks', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  //challange 1
  it('should add at least 2 products to the cart and verify visibility', () => {
    cy.contains('Products').click();
    cy.url().should('include', '/products');

    cy.get('.add-to-cart').eq(0).click(); 
    cy.get('.modal-footer .btn').click(); 

    cy.get('.add-to-cart').eq(2).click(); 

    cy.get('.modal-body').contains('View Cart').click();
    cy.url().should('include', '/view_cart');

    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2);
  });

  //challange 2
  it('should adjust product details quantity unit values and confirm in cart', () => {
    cy.contains('Products').click();
    cy.get('.choose > .nav > li > a').first().click();
    cy.url().should('include', '/product_details/');

    cy.get('#quantity').clear().type('3');

    cy.get('button').contains('Add to cart').click();

    cy.get('.modal-body').contains('View Cart').click();
    cy.url().should('include', '/view_cart');

    cy.get('.cart_quantity button').should('have.text', '3');
  });

  //challange 3
  it('should scroll to footer and successfully subscribe to the newsletter', () => {
    cy.get('#footer').scrollIntoView();

    cy.contains('Subscription').should('be.visible');

    const subscriberEmail = `news_subscriber_${Date.now()}@test.com`;
    cy.get('#susbscribe_email').type(subscriberEmail);

    cy.get('#subscribe').click();

    
    cy.get('.alert-success').should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  });

  //challange 4
  it('should expand sidebar categories and verify routed category inventory display panels', () => {
    cy.get('.left-sidebar').contains('Category').should('be.visible');

    cy.get('.panel-title').contains('Women').click();
    cy.get('#Women').contains('Dress').click();

    cy.url().should('include', '/category_products/');

    cy.get('.features_items').contains('Women - Dress Products').should('be.visible');
  });

});





