
# Time Management App

A simple, interactive time management application built using React.js for the frontend and a Sinatra/ActiveRecord backend.
Aurhor MARY WAIYEGO MACHARIA

## Features

- Allows users to add tasks.
- Users can specify a duration and a schedule for each task.
- Users can delete tasks.
- Notifications are sent to users based on the task's schedule.

## Installation

### Backend

1. Clone the backend repository.
2. Navigate to the root directory in your terminal.
3. Run `bundle install` to install necessary gems.
4. Run `rake db:create` and then `rake db:migrate` to set up the database.
5. Run `ruby app.rb -p 9292` to start the server.

### Frontend

1. Clone the frontend repository.
2. Navigate to the root directory in your terminal.
3. Run `npm install` to install necessary packages.
4. Run `npm start` to start the React application.

## Running the App

1. Open your browser and visit `http://localhost:3000`.
2. You should see the Time Management App up and running.

## Technologies Used

- React.js
- Sinatra/ActiveRecord
- CSS

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
