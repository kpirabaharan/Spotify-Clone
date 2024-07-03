# Spotify Clone App (Next.js)

## Introduction

This is a Spotify clone app created using Next.js, a React framework for server-side rendering and building modern web applications. The app replicates the core functionalities of Spotify, allowing users to discover, search, and play music. All songs and associated artwork are stored using Supabase, a backend-as-a-service (BaaS) platform. Users can subscribe to a Spotify plan using Stripe for recurring payments, and webhooks are set up to update Supabase when Stripe events occur.

## Features

- User Authentication: Users can sign up or log in to their accounts using their email and password, or authenticate with their GitHub account.
- Home Page: Display the newest songs uploaded to Supabase, allowing users to discover the latest music.
- Search: Users can search for artists or tracks.
- Music Player: Play and control music tracks with features like play, pause, skip, and shuffle.
- Automatic Queue Management: Playing a song automatically adds related songs or songs in the playlist to the queue for uninterrupted music playback.
- Favorite Songs: Users can save their favorite songs and access them later.
- Upload Songs with Artwork: Users can upload their own songs along with custom artwork, which is stored on Supabase.
- Subscription Plans: Users can subscribe to different Spotify plans using Stripe for recurring payments.
- Webhooks: Set up webhooks to update Supabase when Stripe events occur, ensuring accurate subscription and payment data.

## Demo

You can access the live demo of the app at [https://spotify-clone-keeshigan.vercel.app/](https://spotify-clone-keeshigan.vercel.app/).

- Feel free to use the anonymous account linked to a dummy email address.
- Or you can use your own email address. This deployment is in test mode so you can "pay" (dummy transactions) with fake information.
  The test payment card is 4242 4242 4242 4242. The rest of the information can be made up.
- _Please don't unsubscribe from the spotify plan from the dummy account. I want to show the billing portal to visitors._

## Technologies Used

- Next.js: React framework for server-side rendering and building web applications
- React: JavaScript library for building user interfaces
- Tailwind CSS: Utility-first CSS framework for styling
- Supabase: Backend-as-a-Service (BaaS) platform for storing songs, artwork, and user data
- Stripe: Payment processing platform for handling recurring payments

## Screenshots

### Home Page

![Home Page](./screenshots/homepage.png)

### Mobile Player

<img src="./screenshots/mobileplayer.jpg" alt="mobile-player" width="250"/>

### Stripe Billing Portal

![Stripe Billing Portal](./screenshots/stripe.png)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or suggestions, please feel free to reach out to me:

- Email: kpirabaharan3@gmail.com
- LinkedIn: [https://linkedin.com/in/kpirabaharan/](https://linkedin.com/in/kpirabaharan/)
