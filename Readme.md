Ext.ux.secure
==============

Allows you to dictate what components get render.  This is not a replacement for server side security.

Setup
--------------

Must initialize the Ext.ux.secure.roles with the user roles before using the render.

### Example

Let say you have a user with administration writes and user rights.  To setup the secure component you would do:

    Ext.ux.secure.roles = ["admin", "users"];

Rendering Components
---------------

Now if you have a component that only an admin can view render you would have:
    Ext.ux.secure.render(
    {
        roles: ["admin"]
        ....

If you are using a container the secure render function will follow also follow items. Example:

	  Ex.ux.secure.render(
    {
        roles: ["admin"],
        items: [
                {
                        roles: ["admin"]
                }
        ]
    })

The license is whatever license you have with ExtJS
