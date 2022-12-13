


export class AppConfig {


   public static SWAGGER_PATH = '/library'


  public static PORT = 3000
  public static API_PREFIX = '/library'
  public static API_PREFIX_USERS ='/library/auth'

 
 
  public static USERS = "users/create"
  public static LOGIN = "login"


  

  public static CREATE_BOOK = '/create/book'
  public static GET_BOOKS = '/get/books'
  public static GET_BOOK_BY_ID = '/books/:id'
  public static UPDATE_BOOK = '/update/book/:id'
  public static DELETE_BOOK = '/delete/book/:id'
  public static ID : 'id'
  public static SECRET = "password"
  

  public static SUPER_ADMIN_CREATION = '/superAdmin'
  public static ADMIN_CREATION ='create/admin' 
  
  public static UPDATE_PERMISSION = '/update/permission/:id'
  public static UPDATE_POLICY = 'policy/:id'

  public static GOOGLE_SIGNUP ='/google/signUp'
  public static GOOGLE_LOGIN = 'google/login'

  
  public static FACEBOOK_SIGNUP ='/facebook/signUp'
  public static FACEBOOK_LOGIN = 'facebook/login'
 public static FACEBOOK_CLIENT_ID = "812042213237253"
 public static FACEBOOK_CLIENT_SECRET ="6e37c10c574f655fd8a50d005676d0c7"
 public static FACEBOOK_CALLBACK = "http://localhost:3000/library/auth/facebook/login"

 public static GOOGLE_CLIENT_ID = "1082952746548-jhds5hr3qh8l2243cq9qs5l56q6jgigk.apps.googleusercontent.com"
 public static GOOGLE_CLIENT_SECRET ="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"
 public static GOOGLE_CALLBACK = "http://localhost:3000/library/auth/google/login"

  
  
  


  
 


  
 





}