Ext.ns('Ext.ux');

/**
 * Used to render gui components.
 */
Ext.ux.SecurityRenderController = function() {
  this.roles = undefined;
};

Ext.ux.SecurityRenderController.prototype = {
  /**
   * Used to render classes based on their on there security.
   *
   * If no security is given the map it is assumed that it doesn't require
   * any specific security level to view this component.
   */
  render : function() {
    var renderObj = undefined;
    if (arguments.length > 1) {
      renderObj = this.processObjArray(arguments);
    } else {
      renderObj = this.processSingleArgument(arguments[0]);
    }
    return renderObj;
  },

  /**
   * used to render a top level component. (It doesn't return an array).
   * 
   * @param topObj The toplevel obj.
   */
  renderTop : function(topObj) {
    return this.render(topObj)[0];
  },

  //private
  processSingleArgument : function(argument) {
    var renderObj = undefined;
    var arg = arguments[0];
    if (arg instanceof Array) {
      renderObj = this.processObjArray(arg);
    } else {
      renderObj = this.processObj(arg);
    }
    return renderObj;
  },

  processObjArray : function(objArray) {
    var renderObj = [];
    for (var i = 0; i < objArray.length; i ++) {
      var current = objArray[i];
      if (this.isUserAbleToView(current)) {
        renderObj.push(current);
      }
    }
    return renderObj;
  },

  processObj : function(obj) {
    var renderObj = [];
    if (this.isUserAbleToView(obj)) {
      renderObj = [obj];
    }
    return renderObj;
  },

  //private
  isUserAbleToView : function(obj) {
    var roles = obj['roles'];
    var valid = false;
    if (roles) {
      valid = this.checkRoles(roles);
    } else {
      valid = true;
    }
    this.processChildren(obj, valid);
    return valid;
  },

  //private
  processChildren : function(obj, valid) {
    if (valid) {
      if (obj.items) {
        obj.items= this.render(obj.items);
      }
    }
  },

  checkRoles : function(roles) {
    var valid = false;
    if (roles instanceof Array) {
      for (var i = 0; i < roles.length; i ++) {
        if (this.hasRole(roles[i])) {
          valid = true;
        }
      }
    } else {
      valid = this.hasRole(roles);
    }
    return valid;
  },

  /**
   * Used to check to see if a user has a role.
   * @param role The role to see if the user has.
   */
  hasRole : function(role) {
    for (var i = 0; i < this.roles.length; i ++) {
      if (this.roles[i] == role) {
        return true;
      }
    }
    return false;
  },

  /**
   * Used to execute a secure function.
   *
   * @param roles The roles the user has to have in order to execute the function.
   * @param func The function to execute.
   * @param scope The scope to call the function with.
   */
  execute: function(roles, func, scope) {
    if (this.checkRoles(roles)) {
      func.call(scope);
    }
  }
};

Ext.ux.secure = new Ext.ux.SecurityRenderController();
