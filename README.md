# bitenav
Project codename BiteNav - Macro tracker and recipe tool

### Requirements
* Python 3.10 or newer (TODO: implement python virtual environment)
* All library requirements are present in included in the *requirements.txt* file. Instructions on how to download these included in the Setup section.

### Setup
**NOTE:** If you have multiple versions of Python installed, you may have to change the given commands slightly to specify your version. *pip3.x* and *py -3.x* should work as alternatives to *pip* and *python* aliases.

1. Install Python 3.10 or newer
2. Pull down the most recent version of this repository to a local location.
3. Install library requirements found in *requirements.txt* by running:
    ```
    pip install -r requirements.txt
    ```
4. Run the following commands to prep and activate the API and database docker containers:
    ```
    cd [repository]/backend
    docker compose build
    docker compose up
    ```
5. Compile and run the frontend. The simplest command to achieve this is:
    ```
    cd [repository]/frontend
    npm run start
    ```

### Helpful Tools
* [PGAdmin](https://www.pgadmin.org/download/) - GUI for interacting with PostgreSQL database. Makes debugging and backend testing much easier.

### Helpful Links/Docs
* [Pydantic Dev Docs](https://docs.pydantic.dev/latest/) - Docs for Pydantic, the tool we use for backend validation and transformation

### Other Tips
* FastAPI endpoints can quickly be tested locally without requiring the front-end by either visiting localhost:8000/docs or with the use of third-party tools such as [Postman](https://www.postman.com/).