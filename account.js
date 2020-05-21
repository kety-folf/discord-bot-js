// this is going to be the new account model, which will integrate
// the database text.

// So far, you want to track:
// - user id (primary entry key)

// And the primary entry key will store:
// - balance



// at the end of command execution, you want accounts to update on the db
// if any property has been changed.

// this could be done by storing a temporary internal value
// that turns true the moment any method is called to update