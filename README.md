# Movie Theater Analytics - JavaScript/Node.js Implementation

This is a JavaScript/Node.js implementation of the movie theater analytics application. The application allows the user to enter a date and retrieve the top performing theater for that day based on total sales.

## Schema and Database Structure

### Tables
1. **theaters**: Stores theater information
   - `theater_id`: Primary key
   - `name`: Theater name (unique)
   - `location`: Theater address
   - `created_at`: Timestamp for auditing

2. **movies**: Stores movie information
   - `movie_id`: Primary key
   - `title`: Movie title (unique)
   - `release_date`: Movie release date
   - `runtime_minutes`: Duration of the movie
   - `created_at`: Timestamp for auditing

3. **daily_sales**: Tracks daily sales data
   - `sale_id`: Primary key
   - `theater_id`: Foreign key to theaters
   - `movie_id`: Foreign key to movies
   - `sale_date`: Date of the sales
   - `total_sales`: Total revenue for the day
   - `tickets_sold`: Number of tickets sold
   - `created_at`: Timestamp for auditing

### Sample Data
The database is initialized with:
- 2 theaters: Cineplex Downtown and Starlight Cinema
- 2 movies: The Matrix Resurrections and Dune: Part Two
- 8 sales records across 2 days (May 9th and May 10th, 2024)

Sample data can be examined in the `schema.sql` file, which serves as both the schema definition and initial data dump.

## Implementation Files

1. **src/index.js**: Main application entry point
   - Handles user interaction through command line
   - Processes date input
   - Displays results

2. **src/database.js**: Database management
   - Manages SQLite connection
   - Initializes database schema
   - Handles connection lifecycle

3. **src/theater-analytics.js**: Business logic
   - Validates date inputs
   - Queries sales data
   - Calculates top performing theater

4. **schema.sql**: Database definition
   - Creates database tables
   - Defines relationships and constraints
   - Includes sample data insertion

## Extension: Containerized Deployment

This implementation extends the core functionality by incorporating Docker containerization. This extension was chosen for several reasons:

1. **Portability**: The containerized application runs consistently across different environments, eliminating "it works on my machine" issues.

2. **Dependencies Management**: All required dependencies (Node.js, SQLite) are packaged within the container, simplifying setup and avoiding version conflicts.

3. **Data Persistence**: Uses Docker volumes to persist the SQLite database, ensuring data survives container restarts.

4. **Isolation**: Provides a clean, isolated environment for the application, making it easier to test and deploy.

# Movie Theater Analytics - JavaScript/Node.js Implementation

[previous sections remain the same...]

## Prerequisites

For Docker setup (recommended):
- Docker Desktop installed on your system
  - [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows/)
  - [Docker Desktop for macOS](https://docs.docker.com/desktop/install/mac/)
  - [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux/)

For local setup (alternative):
- Node.js (version 14 or higher)
- SQLite3

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/caleboki/theater-analytics.git
   cd theater-analytics
   ```

2. Using Docker (recommended):
   ```bash
   docker compose up --build -d

   # Run the application inside the container
   docker compose exec -it theater-analytics bash

   node src/index.js
   ```

## Managing Docker Container

To manage the Docker container, use these commands:

1. Stop and remove the container:
   ```bash
   docker compose down
   ```

2. View container logs:
   ```bash
   docker compose logs
   ```

3. Restart the container:
   ```bash
   docker compose restart
   ```

4. Check container status:
   ```bash
   docker compose ps
   ```

Note: The SQLite database persists in the `./data` directory even after stopping the container.

## Usage

1. When prompted, enter a date in either format:
   - YYYY-MM-DD (e.g., 2024-05-09)
   - MM/DD/YYYY (e.g., 5/9/2024)

2. The application will display:
   - The top performing theater for that date
   - Its location
   - Total sales amount
   - Total tickets sold

3. Enter 'q' to quit the application

## Security Considerations

- Uses parameterized queries to prevent SQL injection
- Validates date inputs before processing
- Implements error handling for invalid inputs
- Restricts database file access through Docker volume