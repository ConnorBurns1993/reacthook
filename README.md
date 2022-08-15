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

Welcome to Reacthook, a clone of Facebook. With Reacthook, you are able to make posts and comment on your friends post. Come join Reacthook and stay connected with the people you love!

**Explore PokéCupid!:** https://reacthook-fb.herokuapp.com/

## **Home** ##
Upon landing on the home page, you may sign up (or log in if you already have an account). If you wish to not create an account for convenience or confidential reasons, you may click the "Want a demo?" button under the Log In button, which can be previewed below.

![Screenshot (149)](https://user-images.githubusercontent.com/97809578/184563914-1ce39457-85e5-42b2-80b7-8630aa2b19b9.png)

## **Log In/Demo User** ##

![Screenshot (150)](https://user-images.githubusercontent.com/97809578/184564152-f60144df-de2c-4f55-848a-e0db429f2ce6.png)

## **Sign Up** ##
If you click the "Join PokéCupid" Button on the Home Page, you are taken to a form where you will be prompt to enter your account details. You may also choose a starter Pokémon, select any of the original 150 Pokémon! You will also be asked to fill out a questionnaire, which is a 20-question survey to assess your match type!
Upon completing the questionnaire, you will be shown your profile information one last time before submission.

![Screenshot (151)](https://user-images.githubusercontent.com/97809578/184564998-710db2fb-b958-4d04-bdf8-b357a6f5d8e1.png)


## **Home Page** ##
Upon logging in or completing your sign up, you will be taken to the Discover page. Here, you can view all the other users and choose to "Like" or "Pass" them. If you like the user, and the user chooses to like you back, this user will be pushed to the "Matches" (explained below) page which shows you all of the people you matched with. If you passed on the person, you will not be shown this person again. 

![Screenshot (153)](https://user-images.githubusercontent.com/97809578/184565083-da46a6a4-31c6-479d-9717-bc0a4120a878.png)

## **Creating a post** ##
![Screenshot (152)](https://user-images.githubusercontent.com/97809578/184565097-663c1a32-d668-4521-83e5-9faa1cb2d1e7.png)


## **Creating a comment** ##
![Screenshot (154)](https://user-images.githubusercontent.com/97809578/184565140-a55ee6dd-0868-46bd-a245-00288e378510.png)

## **User Profiles** ##

![Screenshot (156)](https://user-images.githubusercontent.com/97809578/184565195-6428aa45-5501-41e1-a907-46f0533b3bc7.png)


## How to begin
1 - Clone this repository

   ```bash
  git clone https://github.com/ConnorBurns1993/reacthook.git
   ```

2 - Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3 - Create a **.env** file based on the example with proper settings for your
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
