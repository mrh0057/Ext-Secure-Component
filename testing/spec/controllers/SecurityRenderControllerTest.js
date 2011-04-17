describe('Security Render Controller Tests', function() {

  beforeEach(function() {
    Ext.ux.secure.roles = ['admin', 'user'];
  });

  it('matching roles test array', function() {
    Ext.ux.secure.roles = ["admin", "user"];
    var testObject = [
      {id: "obj1", roles : ["user"]},
      {id: "obj2", roles : ["bob"]}
    ];
    Ext.ux.secure.render(testObject);
  });

  it('check roles works with a list of roles valid', function() {
    expect(Ext.ux.secure.checkRoles(['admin', 'something', 'else'])).toEqual(true);
  });

  it('Check roles works with a list of invalid roles', function() {
    expect(Ext.ux.secure.checkRoles(['wrong', 'role'])).toEqual(false);
  });

  it('Matching roles test single', function() {
    Ext.ux.secure.roles = ["admin"];
    var testObject = {id: "obj1", roles : 'admin'};
    expect(Ext.ux.secure.render(testObject)).toEqual([testObject]);

    testObject = {id: "obj1", roles: 'user'};
    expect(Ext.ux.secure.render(testObject)).toEqual([]);
  });

  it('Matching roles test multiple', function() {
    Ext.ux.secure.roles = ["admin", "user"];
    var validObj = [
      {id: "obj1", roles : 'admin'},
      {id: "obj2", roles : 'user'}
    ];
    expect(Ext.ux.secure.render({id: "obj1", roles : 'admin'}, {id: "obj2", roles : 'user'})).
      toEqual(validObj);
  });

  it('Testing has roles', function() {
    expect(Ext.ux.secure.hasRole('admin')).toEqual(true);

    Ext.ux.secure.roles = ['admin'];
    expect(Ext.ux.secure.hasRole('user')).toEqual(false)
  });

  it('Test when obj has no roles', function() {
    Ext.ux.secure.roles = ['admin'];
    var testObject = {id : 'hello'};
    var validObject = {id : 'hello'};
    expect(Ext.ux.secure.render(testObject)).toEqual([validObject]);
  })

  it('Test nested items', function() {
    var items = [
      {id: "obj1", roles : 'admin'},
      {id: "obj2", roles : 'user',
        items : [{id: "obj1", roles : 'admin'}]}
    ];
    var testObject = {id : 'hello', items : items};
    var validObject = {id : 'hello', items : items};
    expect(Ext.ux.secure.renderTop(testObject)).toEqual(validObject);
  });

  it('Test nested items invalid', function() {
    var items = [
      {id: "obj1", roles : 'admin'},
      {id: "obj2", roles : 'users',
        items : [{id: "obj1", roles : 'other'}]}
    ];
    var testObject = {id : 'hello', items : items};

    var valid = {id : 'hello', items : [{id: "obj1", roles : 'admin'}]};

    expect(Ext.ux.secure.renderTop(testObject)).toEqual(valid);
  });
});
