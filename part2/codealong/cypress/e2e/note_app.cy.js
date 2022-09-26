describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'user one',
      username: 'user1',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
  });
  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    );
  });
  it('login form can be opened', function () {
    cy.contains('login').click();
  });
  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('user1');
    cy.get('#password').type('test');
    cy.get('#login-button').click();
    cy.contains('"user one" is logged in');
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'test' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#new-note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').contains('make important').click();

        cy.contains('second note').contains('make not important');
      });
    });
  });
});
