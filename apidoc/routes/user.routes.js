import controller from '../controllers/user.controller';

export default router => {
  /**
     *  @api [post] /users
     *  summary: "Create user"
     *  tags: ["Users"]
     *  description: "Create user"
     *  parameters: [
     *       {
     *        "name": "body",
     *        "in": "body",
     *        "description": "Create user",
     *        "required": true,
     *          "schema": {
     *          	"properties": {
     *                   "email" : {
     *	 					"type" : "string",
     *						"example" : "dev@dev.com",
     * 					},
     *                   "fullName" : {
     *	 					"type" : "string",
     *						"example" : "FULL NAME",
     * 					},
     *			  		"password" : {
     *	 					"type" : "string",
     *						"example" : "covid19"
     *					},
     *                  "phone" : {
     *	 					"type" : "string",
     *						"example" : "PHONE"
     *					}
     *             	}
     *          }
     *       }
     *    ]
     *  responses: {
     *     "200": {
     *       "description": "User created successfully"
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *     },
     *    "403": {
     *       "description": "Forbidden"
     *     }
     *  }
     */
  router.post('/users', controller.create);

  // TODO: Remove queries if we don't need it
  /**
    *  @api [get] /users
    *  summary: "Returns all users"
    *  tags: ["Users"]
    *  description: "Returns all users"
    *  parameters: [
    *    {
    *        "name": "search",
    *        "in": "query",
    *        "description": "search",
    *        "type": "string"
    *    },
    *    {
    *        "name": "users",
    *        "in": "query",
    *        "description": "search after array of users data",
    *        "type": "string"
    *    },
    *    {
    *        "name": "page",
    *        "in": "query",
    *        "description": "page",
    *        "type": "number"
    *    },
    *    {
    *        "name": "limit",
    *        "in": "query",
    *        "description": "limit",
    *        "type": "number"
    *    },
    *    {
    *        "name": "isCollapseFilter",
    *        "in": "query",
    *        "description": "Get the response as a filter",
    *        "type": "boolean"
    *    },
    *    {
    *        "name": "sort",
    *        "in": "query",
    *        "description": "Sort users",
    *        "type": "string"
    *    },
    *    {
    *        "name": "sortOrder",
    *        "in": "query",
    *        "description": "Sort users by order ASC or DESC",
    *        "type": "string"
    *    }
    *  ]
    *  responses: {
    *     "200": {
    *       "description": "Users returned successfully"
    *     },
    *     "400": {
    *       "description": "Bad data sent"
    *     },
    *    "403": {
    *       "description": "Forbidden"
    *     },
    *    "404": {
    *       "description": "User not found"
    *    }
    *  }
    */
  router.get('/users', controller.getAll);

  /**
    *  @api [get] /users/list
    *  summary: "Returns all users"
    *  tags: ["Users"]
    *  description: "Returns all users"
    *  parameters: [
    *    {
    *        "name": "search",
    *        "in": "query",
    *        "description": "search",
    *        "type": "string"
    *    },
    *    {
    *        "name": "users",
    *        "in": "query",
    *        "description": "search after array of users data",
    *        "type": "string"
    *    },
    *    {
    *        "name": "page",
    *        "in": "query",
    *        "description": "page",
    *        "type": "number"
    *    },
    *    {
    *        "name": "limit",
    *        "in": "query",
    *        "description": "limit",
    *        "type": "number"
    *    },
    *    {
    *        "name": "isCollapseFilter",
    *        "in": "query",
    *        "description": "Get the response as a filter",
    *        "type": "boolean"
    *    },
    *    {
    *        "name": "sort",
    *        "in": "query",
    *        "description": "Sort users",
    *        "type": "string"
    *    },
    *    {
    *        "name": "sortOrder",
    *        "in": "query",
    *        "description": "Sort users by order ASC or DESC",
    *        "type": "string"
    *    }
    *  ]
    *  responses: {
    *     "200": {
    *       "description": "Users returned successfully"
    *     },
    *     "400": {
    *       "description": "Bad data sent"
    *     },
    *    "403": {
    *       "description": "Forbidden"
    *     },
    *    "404": {
    *       "description": "User not found"
    *    }
    *  }
    */
  router.get('/users/list', controller.getList);

  /**
    *  @api [put] /users/reset-password
    *  summary: "Reset password"
    *  tags: ["Users"]
    *  description: "Reset password"
    *  parameters: [
    *       {
    *         "name": "recoveryHash",
    *         "in": "query",
    *         "description": "Password recovery hash",
    *         "type": "string"
    *       },
    *       {
    *        "name": "body",
    *        "in": "body",
    *        "description": "Reset password",
    *        "required": true,
    *          "schema": {
    *              "properties": {
    *                  "password" : {
    *                      "type" : "string",
    *                      "example" : "smackheadsteve"
    *                  }
    *              }
    *          }
    *       }
    *    ]
    *  responses: {
    *     "200": {
    *       "description": "Password reset successfully"
    *     },
    *     "400": {
    *       "description": "Bad data sent"
    *     },
    *    "403": {
    *       "description": "Forbidden"
    *    },
    *    "404": {
    *       "description": "User not found"
    *    }
    *  }
    */
  router.put('/users/reset-password', controller.resetPassword);

  /**
     *  @api [put] /users/{id}
     *  summary: "Update user"
     *  tags: ["Users"]
     *  description: "Update user"
     *  parameters: [
     *       {
     *         "name": "id",
     *         "in": "path",
     *         "description": "User id",
     *         "required": true,
     *         "type": "integer"
     *       },
     *       {
     *        "name": "body",
     *        "in": "body",
     *        "description": "Update user",
     *        "required": true,
     *          "schema": {
     *          	"properties": {
     *                   "fullName" : {
     *	 					"type" : "string",
     *						"example" : "Full Name",
     * 					},
     *			  		"password" : {
     *	 					"type" : "string",
     *						"example" : "PASSWORD"
     *					},
     *                  "phone" : {
     *	 					"type" : "string",
     *						"example" : "PHONE"
     *					}
     *             	}
     *          }
     *       }
     *    ]
     *  responses: {
     *     "200": {
     *       "description": "User updated successfully"
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *     },
     *    "403": {
     *       "description": "Forbidden"
     *    },
     *    "404": {
     *       "description": "User not found"
     *    }
     *  }
     */
  router.put('/users/:id', controller.update);

  /**
     *  @api [get] /users/{id}
     *  summary: "Get user by primary key"
     *  tags: ["Users"]
     *  description: "Get user by primary key"
     *  parameters: [
     *       {
     *         "name": "id",
     *         "in": "path",
     *         "description": "User id",
     *         "required": true,
     *         "type": "integer"
     *       },
     *  ]
     *  responses: {
     *     "200": {
     *       "description": "User updated successfully"
     *     },
     *    "403": {
     *       "description": "Forbidden"
     *    },
     *    "404": {
     *       "description": "User not found"
     *    }
     *  }
     */
  router.get('/users/:id', controller.get);

  /**
     *  @api [delete] /users/{id}
     *  summary: "Delete user by primary key"
     *  tags: ["Users"]
     *  description: "Delete user by primary key"
     *  parameters: [
     *       {
     *         "name": "id",
     *         "in": "path",
     *         "description": "User id",
     *         "required": true,
     *         "type": "integer"
     *       },
     *  ]
     *  responses: {
     *     "200": {
     *       "description": "User removed successfully"
     *     },
     *    "403": {
     *       "description": "Forbidden"
     *    },
     *    "404": {
     *       "description": "User not found"
     *    }
     *  }
     */
  router.delete('/users/:id', controller.remove);

  /**
     *  @api [post] /users/authentication
     *  summary: "Return user if email password are correct"
     *  tags: ["Users"]
     *  description: "User for authentication"
     *  parameters: [
     *       {
     *        "name": "body",
     *        "in": "body",
     *        "description": "User for authentication",
     *        "required": true,
     *          "schema": {
     *          	"properties": {
     *                   "email" : {
     *	 					"type" : "string",
     *						"example" : "user@dood.ro",
     * 					},
     *    "password" : {
     *        "type" : "string",
     *        "example" : "password",
     * 		}
     *             	}
     *          }
     *       }
     *    ]
     *  responses: {
     *     "200": {
     *       "description": "User found"
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *    },
     *    "404": {
     *       "description": "User with email and password not found"
     *     }
     *  }
     */
  router.post('/users/authentication', controller.authentication);

  /**
     *  @api [post] /users/recover-password
     *  summary: "Sends email to user with link to recover password"
     *  tags: ["Users"]
     *  description: "Recover password email"
     *  parameters: [
     *       {
     *        "name": "body",
     *        "in": "body",
     *        "description": "Recover password email",
     *        "required": true,
     *          "schema": {
     *          	"properties": {
     *                   "email" : {
     *	 					"type" : "string",
     *						"example" : "user@dood.ro",
     * 					}
     *             	}
     *          }
     *       }
     *    ]
     *  responses: {
     *     "200": {
     *       "description": "Email with recovery link sent"
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *    },
     *    "404": {
     *       "description": "User not found"
     *     }
     *  }
     */
  router.post('/users/recover-password', controller.recoverPassword);

  /**
     *  @api [get] /users/verify-token/{token}
     *  summary: "Verify token send for recover password"
     *  tags: ["Users"]
     *  description: "Verify token for recover password"
     *  parameters: [
     *       {
     *         "name": "token",
     *         "in": "path",
     *         "description": "Token for password recovery",
     *         "required": true,
     *         "type": "string"
     *       },
     *  ]
     *  responses: {
     *     "200": {
     *       "description": "Return if token for password recovery is valid"
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *    },
     *    "404": {
     *       "description": "User not found"
     *     }
     *  }
     */
  router.get('/users/verify-token/:token', controller.verifyToken);

  /**
     *  @api [post] /users/{id}/change-password
     *  summary: "Change user password"
     *  tags: ["Users"]
     *  description: "Change user password"
     *  parameters: [
     *       {
     *         "name": "id",
     *         "in": "path",
     *         "description": "User id",
     *         "required": true,
     *         "type": "integer"
     *       },
     *       {
     *        "name": "body",
     *        "in": "body",
     *        "description": "Change user password",
     *        "required": true,
     *          "schema": {
     *          	"properties": {
     *                   "currentPassword" : {
     *	 					"type" : "string",
                            "description": "This is optional. Is used when user wants to change his password from his account",
     *						"example" : "myCurrentpassword",
     * 					},
     *                   "password" : {
     *	 					"type" : "string",
     *						"example" : "newpassword",
     * 					}
     *             	}
     *          }
     *       }
     *    ]
     *  responses: {
     *     "200": {
     *       "description": "User password successfully changed."
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *    },
     *    "404": {
     *       "description": "User not found"
     *     }
     *  }
     */
  router.post('/users/:id/change-password', controller.changePassword);

  /**
     *  @api [post] /users/{id}/change-email
     *  summary: "Change user email"
     *  tags: ["Users"]
     *  description: "Change user email"
     *  parameters: [
     *       {
     *         "name": "id",
     *         "in": "path",
     *         "description": "User id",
     *         "required": true,
     *         "type": "integer"
     *       },
     *       {
     *        "name": "body",
     *        "in": "body",
     *        "description": "Change user password",
     *        "required": true,
     *          "schema": {
     *          	"properties": {
     *                   "email" : {
     *	 					"type" : "string",
     *						"example" : "alkarar@covid.ro",
     * 					}
     *             	}
     *          }
     *       }
     *    ]
     *  responses: {
     *     "200": {
     *       "description": "User email successfully changed."
     *     },
     *     "400": {
     *       "description": "Bad data sent"
     *    },
     *    "404": {
     *       "description": "User not found"
     *     }
     *  }
     */
  router.post('/users/:id/change-email', controller.changeEmail);
};
