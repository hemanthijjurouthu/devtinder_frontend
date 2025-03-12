# login

-install axios module to make api call
-we cannot make an api call from one domain to another domain
# install @reduxjs/toolkit and react-redux

- configure store -> provide the store to main root of the component -> create slice -> add the reducer of the slice to the store -> dispatch an action -> it will automatically update our store.


-User cannot access other pages without login
-pass on token to server to check if he is logged in or rot otherwise restrict him from accessing the pages.

-if user was not loggedIn redirect him to login Page
 
 -always use optional chaining for accessing data

 -display proper message for the user if he enters invalid credentials


# Building Edit Profile

-As the user enters his edited details according to the details it shows the preview of the data so pass the updated details to the userCard it should display side

# /connections - shows all the connections of the user
-it fetches the data once whenever component unmounts

# /requests - shows all the recieved requests

-Each request is having accepted and rejected
-when we click on accepted and rejected it should be updated in the database and shows it as a 
connection when we click on accepted.

