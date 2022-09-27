describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'User One',
      username: 'user1',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log-in').click();
  });
  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.contains('Log-in').click();
      cy.get('#username').type('user');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });

    it('login works', function () {
      cy.contains('Log-in').click();
      cy.get('#username').type('user1');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
      cy.contains('USER ONE is logged in');
    });
  });
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'test' });
    });

    it('A blog can be created', function () {
      cy.contains('Add new blog').click();
      cy.get('#blog-title').type('title1');
      cy.get('#blog-url').type('url1');
      cy.get('#blog-author').type('author1');
      cy.get('.submitBtn').click();
      cy.contains('title1');
    });

    describe('and several blogEntries can be created', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'first blog',
          url: 'some url',
          author: 'some author',
        });
        cy.addBlog({
          title: 'second blog',
          url: 'some url',
          author: 'some author',
        });
        cy.addBlog({
          title: 'third blog',
          url: 'some url',
          author: 'some author',
        });
      });
      it('and one of these can be liked', function () {
        cy.contains('third blog').parent().contains('show').click();
        cy.contains('like').click();
        cy.contains('1');
      });
      it('and one of these can be deleted', function () {
        cy.contains('first blog').parent().contains('show').click();
        cy.contains('Delete').click();
        cy.get('.blog-box').should('have.length', 2);
      });
      it('and are ordered based on likes', function () {
        cy.contains('third blog').parent().contains('show').click();
        cy.contains('like').click();
        cy.get('.blog-box').eq(0).should('contain', 'first blog');
      });
    });
  });
});
