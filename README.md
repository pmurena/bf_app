# bf_app
A nativescript client for the boddyfinder server.
      https://github.com/pmurena/buddyfinder
## Introduction
You'd love to visit a contemporary art exposition but your better half is more of a renaissance person? Your friends ride mountain bikes but you're a roadi? You're an erasmus student and tired of eating alone? Maybe your tennis buddy is sick and the court is already reserved... No matter the reason, buddyfinder is here to help. Buddyfinder is meant for any spontaneous extracurricular activity. Simply name the activity, location and time to find people to share it with. All you need to get started is a valid unibe, unifr or unine e-mail address and off you go!

In the first version, we will most certainly build the whole activity creation, sharing and inviting/joining part. As well as the authentication and authorization for uni-be, fr, ne addresses. We also plan to build a responsive GUI such that it can be used on any screen.

If time allows we will add some extra features such as uploading pictures from the activities to create a Uni-Recreational album, enable commenting, publishing to other social networks, etc... We will see along the way which makes the most sense and what time allows us to do.

Technology wise we are only bound to Node.Js and GitHub so far. Considering the application we think that a no-SQL DB will be most appropriate, we haven't chosen which one we will use yet. We will deploy our app on a PAAS, but here again, we haven't made a choice at this stage of the project.

## Requirements
- nodejs 6.x.x
- nativescript 3.3.x
- tns-core-modules 3.3.x
- tns-android 3.3.x
- tns-ios 3.3.x
- buddyfinder server

see nativce script installation giude to get up and running: https://docs.nativescript.org/start/quick-setup

## How to run
To run this app you will need access to a BuddyFinder server. By default the public Heroku instance is used. If you, however, choose to use a different server you will need to change the ./app/shared/config.js accordingly. 

See the BuddyFinder Server documentation for details on how to get it running. https://github.com/pmurena/buddyfinder/blob/master/README.md

Once you're set-up and have your config straight run the following command from your project folder:

      tns run android
or

      tns run iOS

## Dev Tools Used
You can use your any nodejs friendly IDE or your favorit texteditor such as Atom for example (https://atom.io/)
