# Reacthook #

**Created by:** 
- [Connor Burns](https://github.com/ConnorBurns1993) 

**Created using:** 
- ***Python***
- ***Flask***
- ***Javascript***
- ***React***
- ***Redux***
- ***PostgreSQL***
- ***CSS***

Welcome to Reacthook, a clone of Facebook. Create posts for your friends to read and comment on, and interact with your friends posts too! Stay connected with everything new in your friends lives.

**Explore Reacthook!:** https://reacthook-fb.herokuapp.com/

## **Splash Page** ##
Upon landing on the home page, you may sign up (or log in if you already have an account). If you wish to not create an account for convenience or confidential reasons, you may click the "Want a demo?" button underneath the Log In button, which can be previewed below.

![Screenshot (149)](https://user-images.githubusercontent.com/97809578/184635104-72d6785c-4da9-443e-837a-e85283135ea2.png)


## **Log In & Sign Up** ##

![Screenshot (150)](https://user-images.githubusercontent.com/97809578/184635173-23b15f6e-7dc6-47ba-89af-c56898fe7e54.png)

![Screenshot (151)](https://user-images.githubusercontent.com/97809578/184635192-e4754400-5777-4eeb-ac9d-ee53c7476c6c.png)




## **Newsfeed** ##
After you've logged in or signed up, you'll be redirected to the newsfeed page, where you're able to see every new post that has been made. From here you can create your own post, comment on others posts, send images - connect with all your friends!

![Screenshot (153)](https://user-images.githubusercontent.com/97809578/184635545-26e56191-8a7a-44f6-a8f6-8282f553251e.png)



## **Creating a Post** ##
![Screenshot (152)](https://user-images.githubusercontent.com/97809578/184635652-3b0fff8e-a830-44ca-acc2-15e62c35dace.png)


## **Commenting** ##

![Screenshot (155)](https://user-images.githubusercontent.com/97809578/184635832-de9112ad-4908-4c3d-b92d-24e84da4382d.png)

## **Editing & Deleting Your Posts** ##

![Screenshot (154)](https://user-images.githubusercontent.com/97809578/184635910-d9b806cb-56c0-47c1-bcf2-988093b16904.png)

## **Matches & Messaging** ##
From the newsfeed page, you can click any user's name or profile picture and be directed to their profile page so you can learn a little more about them.

![Screenshot (156)](https://user-images.githubusercontent.com/97809578/184636027-e66a67ba-f162-4094-ae6b-03a869c54761.png)

## How to Clone
1. Clone this repository

      ```bash
      git clone https://github.com/ConnorBurns1993/reacthook.git
        ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

I hope you enjoy Reacthook!
