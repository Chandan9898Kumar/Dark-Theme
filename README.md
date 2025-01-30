### Docker Set-Up For React App

- A Dockerfile is a script that contains a series of instructions on how to build a Docker image for your application. For a React app, the Dockerfile will specify the base image, copy the app files, install dependencies, build the app, and define how the app should run within the container.

**Follow these steps to create an effective Dockerfile for your React app:**

1. `Create a Dockerfile in the Root Directory:` In the root directory of your React project, create a new file named Dockerfile (without any file extension).

2. `Specify the Base Image:` Begin by specifying the base image. For a React app, we typically use the official Node.js image, as it includes Node.js and npm, which are required to build and run the app. FROM node:14-alpine

3. `Set the Working Directory:` Set the working directory inside the container where the app’s code will reside. This helps keep the filesystem organized. WORKDIR /app

4. `Copy the Package Files and Install Dependencies:` Copy the package.json and package-lock.json files to the working directory. Then, install the dependencies using npm. COPY package\*.json ./ RUN npm install

5. `Copy the Application Code:` Copy the rest of the application code to the working directory. COPY . .

6. `Build the React Application:` Run the build command to create a production build of the React app. RUN npm run build

7. `Serve the Application:`
   A. Use a lightweight web server like serve to serve the static files. First, install serve: RUN npm install -g serve
   B. Specify the command to run the server when the container starts. CMD ["serve", "-s", "build"]

8. `Expose the Necessary Port:` Expose the port that the application will run on. By default, serve uses port 5000. EXPOSE 5000

```
# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install the 'serve' package to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "build"]

```

With the Dockerfile created, you are now ready to build the Docker image for your React app.

### Building the Docker Image.

Once you have created the Dockerfile, the next step is to build the Docker image. This image will contain everything needed to run your React application, encapsulated in a consistent environment.

- Follow these detailed steps to build your Docker image:

1. `Open Your Terminal:` Navigate to the root directory of your React project where your Dockerfile is located.

2. `Build the Docker Image:` Use the docker build command to create the Docker image. The -t flag allows you to tag your image with a name for easier reference. docker build -t react-app-image .

`Explanation of the command:`
A. docker build: The command to build a Docker image.
B. -t react-app-image: Tags the image with the name react-app-image. You can choose any name for your image.
C. .: Specifies the current directory as the build context, meaning Docker will use the Dockerfile and other necessary files from this directory.

3. `Monitor the Build Process:`

   As the image builds, Docker will execute each instruction in the Dockerfile. You will see output logs indicating the progress of each step.
   Common steps include downloading the Node.js image, copying files, installing dependencies, building the

   React app, and setting up the server.
   Ensure that there are no errors during the build process. If any errors occur, review the Dockerfile and the output logs to identify and fix the issues.

4. `Verify the Docker Image:`

   After the build process completes successfully, you can verify the created image by listing all Docker images on your system: docker images
   This command will display a list of images, including the one you just built. You should see react-app-image in the list along with its image ID, creation time, and size.

5. `Optimizing the Docker Image (Optional):`

   To keep your Docker image lightweight, consider multi-stage builds. This approach allows you to separate the build environment from the runtime environment, ensuring that only the necessary files are included in the final image.

With the Docker image built, you are now ready to run the Docker container and see your React app in action.

### Running the Docker Container

After building the Docker image, the next step is to run the Docker container. The container will use the image you created to instantiate an isolated environment where your React app can run.

`Follow these detailed steps to run your Docker container:`

1. `Run the Docker Container:`

   Use the docker run command to start a new container from your Docker image. You will need to map a port from your host machine to the container to access the React app in your browser.

   **docker run -d -p 3000:5000 --name react-app-container react-app-image**

   `Explanation of the command:`
   A. `docker run:` The command to run a new Docker container.
   B. `-d:` Runs the container in detached mode, meaning it runs in the background.
   C. `-p 3000:5000:` Maps port 3000 on your host machine to port 5000 in the container. This allows you to access the app via http://localhost:3000.
   D. `--name react-app-container:` Assigns a name to the running container for easier management.
   E. `react-app-image:` The name of the Docker image you built in the previous section.

2. `Verify the Container is Running:`

   List all running Docker containers to verify that your container is up and running:
   **docker ps**
   This command will display a list of running containers. Look for react-app-container in the list along with its status and port mappings.

3. `Access the React`
   App:

   Open your web browser and navigate to http://localhost:3000. You should see your React application running.
   Verify that the app functions as expected. Since the app is running in a Docker container, it should be isolated from any variations in the host environment.

4. `Managing the Docker Container:`

   A. `Stop the Container:` If you need to stop the container, use the docker stop command followed by the container name.
   **docker stop react-app-container**

   B. `Restart the Container:` To restart a stopped container, use the docker start command.
   **docker start react-app-container**

   C. `Remove the Container:` To remove a container when you no longer need it, use the docker rm command. Make sure to stop the container first if it is running.
   **docker stop react-app-container docker rm react-app-container**

5. `Viewing Container Logs:`

   To view the logs of your running container, use the docker logs command. This is useful for debugging and monitoring your application.
   **docker logs react-app-container**

6. `Accessing the Container Shell:`

   If you need to access the shell of the running container for troubleshooting or manual inspection, use the docker exec command.
   **docker exec -it react-app-container sh**

   This command opens an interactive shell session within the container.

- By Above following steps, you can successfully run your Docker container and manage it effectively.

### Using Docker Compose (Optional).

Docker Compose is a powerful tool for defining and running multi-container Docker applications. It allows you to use a docker-compose.yml file to configure your application’s services, networks, and volumes.

1. `Install Docker Compose:` Docker Compose is typically included with Docker Desktop, but if you need to install it separately, follow the instructions on the Docker Compose installation page.

2. `Create a docker-compose.yml File:`
   A. In the root directory of your React project, create a new file named docker-compose.yml.
   B. This file will define the services required for your application. For a simple React app, you will typically need just one service.

3. `Define the React App Service:`
   Add the following configuration to the docker-compose.yml file to define the React app service:

```js
version: '3'
services:
  react-app:
    image: react-app-image
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:5000"
    command: ["serve", "-s", "build"]
```

`Explanation of the configuration:`

1. `version:` Specifies the version of the Docker Compose file format.
2. `services:` Defines the services that make up your application.
3. `react-app:` The name of the service.
4. `image:` Specifies the image name. Docker Compose will build the image from the Dockerfile if it doesn’t already exist.
5. `build:` Defines the build context and Dockerfile for the service.
6. `ports:` Maps port 3000 on the host to port 5000 in the container.
7. `command:` Specifies the command to run the application.

Now ,

1. `Build and Run the Containers:`

   Use the docker-compose up command to build and start the services defined in the docker-compose.yml file.
   **docker-compose up**
   This command builds the Docker image if it doesn’t already exist and starts the container.

   Use the -d flag to run the services in detached mode (background).
   **docker-compose up -d**

2. `Verify the Containers are Running:`

   List all running services with the docker-compose ps command.
   **docker-compose ps**

   This command shows the status of the services defined in your docker-compose.yml file.

3. `Access the React App:`

   Open your web browser and navigate to http://localhost:3000 to access your
   React application running in a Docker container managed by Docker Compose.

4. `Managing the Services:`
   A. `Stop the Services:` Use the docker-compose down command to stop and remove the containers, networks, and volumes defined in the docker-compose.yml file.
   **docker-compose down**

   B. `Restart the Services:` Use the docker-compose restart command to restart the services.
   **docker-compose restart**

   C. `View Logs:` Use the docker-compose logs command to view the logs of all services.
   **docker-compose logs**

   C. `Scale Services:` Use the docker-compose up --scale option to run multiple instances of a service.
   **docker-compose up --scale react-app=3**

Using Docker Compose simplifies the management of your React application’s Docker containers, especially when dealing with more complex setups or multiple services.

### Testing and Debugging

1. `Check Container Logs:`

A. Use the docker logs command to view the logs of your running container. Logs can provide valuable insights into what might be going wrong if the app isn’t working as expected.
**docker logs react-app-container**

B. For Docker Compose setups, use the docker-compose logs command to view logs for all services.
**docker-compose logs**

2. `Debugging with Interactive Shell:`
   A. Access the shell of the running container using the docker exec command to inspect the container’s environment and troubleshoot issues.
   **docker exec -it react-app-container sh**
   This command opens an interactive shell session within the container, allowing you to run commands, check configurations, and view files.

3. `Common Issues and Solutions:`

A. `Port Conflicts:` Ensure no other services on your host machine are using the same port as your Docker container. Adjust the port mapping in the Docker run or Docker Compose file if necessary.

B. `Environment Variables:` Verify that all required environment variables are correctly set and accessible within the container. Use the docker exec command to check environment variables inside the container.
**docker exec -it react-app-container printenv**

C. `Dependency Issues:` Ensure all necessary dependencies are installed and correctly specified in the Dockerfile. If there are missing dependencies, update the Dockerfile and rebuild the image.

D. `Rebuilding the Docker Image:`

A. If you make changes to your code or Dockerfile, rebuild the Docker image to include the updates.
**docker build -t react-app-image .**

B. For Docker Compose setups, use the docker-compose up --build command to rebuild the image and restart the services.
**docker-compose up --build**

E. `Automated Testing:`
Integrate automated tests into your Docker setup to ensure the app’s functionality remains intact. You can add a step in the Dockerfile to run tests during the build process. # Add this before the final CMD instruction in your Dockerfile RUN npm test
Alternatively, create a separate test service in your docker-compose.yml file to run tests independently of the main application service.

F. `Monitoring and Performance Tuning:`

A. Monitor the performance and resource usage of your Docker container using Docker commands like docker stats.
**docker stats react-app-container**
B. Optimize your Dockerfile to reduce image size and improve container performance. Techniques include using multi-stage builds, minimizing the number of layers, and removing unnecessary files and dependencies.

### React Lazy Loading Issue and Solution.

Assume any user had the app loaded sometime in the early morning and came back to use it in the afternoon, but if in the middle of that the app gets deployed - publishing the new builds, so what happens is → the first time the app was loaded, any other page links with React.lazy had a reference to some bundle → let’s say about.123.js so whenever the user would click on the about link, the app will try to fetch this file and use it, but in this very special case if the file on the server actually got updated, to let’s say about.456.js hence the actual network call with fail with a 404, isn’t it? and the app will crash 🐛. To address this issue, we have written a very minimal wrapper around React.lazy that simply ensures if the bundle fails to load, it reloads the whole app, so that all the references to the bundles are fresh and are available on the server.

- Solution :

```js
import { lazy } from 'react';

export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error(error);
      return window.location.reload();
    }
  });

// Usage
const HomePage = lazyWithRetry(() => import('./HomePage'));
```

`What it does is basically tries to load the asset within a try...catch block, and if throws any error, it just simply reloads the whole app. I know CDNs can solve this problem with a better way, but just in case your app doesn’t use a CDN or the CDN is down itself. If there is a better solution or enhancement to this, please comment below and let me know, happy to discuss.`

### View Transition API in React App.

The View Transition API is a new feature on web that simplifies the process of creating animated transitions for shared element. Previously, achieving smooth transitions for shared element on the web was a complex task. However, with the introduction of this API, we can now easily animate shared element, allows us to create engaging and fluid navigational experiences, similar to those found in mobile applications.

`Example :`

```js
import * as React from 'react';
import { flushSync } from 'react-dom';

const App = () => {
  const [isThumbnail, setIsThumbnail] = React.useState(true);

  const handleMove = () => {
    document.startViewTransition(() => {
      flushSync(() => {
        setIsThumbnail((prev) => !prev);
      });
    });
  };

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar-content">
          <h1>Move Cat</h1>
          <button onClick={handleMove}>Move</button>
        </div>
        {isThumbnail && (
          <img
            src="https://res.cloudinary.com/djzsjzasg/image/upload/c_scale,w_300/v1678947391/malcolm-kee/meow_dtsn8h.png"
            alt="cat"
            className="cat-img thumbnail"
          />
        )}
      </div>
      {!isThumbnail && (
        <div className="cat-details">
          <img
            src="https://res.cloudinary.com/djzsjzasg/image/upload/c_scale,w_500/v1678947391/malcolm-kee/meow_dtsn8h.png"
            alt="cat"
            className="cat-img detailed-img"
          />
          <div className="cat-desc">
            <h2>Cat Details</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



### React renders state changes asynchronously, we need to wrap the state-setter function with `flushSync` to force the state changes to be applied synchronously.


### Using Progressive Enhancement Technique with View Transition.

To ensure that your application still functions properly on browsers that do not support the View Transition API, you can use the progressive enhancement technique. This involves checking whether document.startViewTransition is available before using it. If it’s not available, then no animation will be applied.

  const handleMove = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setIsThumbnail((prev) => !prev);
        });
      });
    } else {
      setIsThumbnail((prev) => !prev);
    }
  };



### NOTE :

In conclusion, the View Transition API offers a straightforward way to create smooth animations for web applications. By implementing it in your React projects and using progressive enhancement, you can cover a wider range of browsers while enhancing user experience.
```

### To detect page load times in a React application, you can utilize the Performance API, specifically the PerformanceNavigationTiming interface. This approach allows you to measure how long it takes for your application to load and become interactive.

`Using Performance API`

1. **Basic Implementation**
   You can track the page load time by listening for the load event and then accessing performance metrics. Here’s a simple example:

```js
window.addEventListener('load', () => {
  const [navigationEntry] = performance.getEntriesByType('navigation');
  console.log(`Page Load Time: ${navigationEntry.loadEventEnd} ms`);
});
```

This code captures the load time once the window has fully loaded. However, ensure to check if navigationEntry is defined to avoid errors if no entries are present.

2. **Handling Route Changes in SPAs**

In single-page applications (SPAs) like those built with React, route changes do not trigger a full page reload. Therefore, you need to measure load times on each route change. You can achieve this by using React Router's hooks or lifecycle methods. For example:

```js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageLoadTime = () => {
  const location = useLocation();

  useEffect(() => {
    const handleLoadTime = () => {
      const [navigationEntry] = performance.getEntriesByType('navigation');
      console.log(`Load time for ${location.pathname}: ${navigationEntry.loadEventEnd} ms`);
    };

    handleLoadTime();
  }, [location]);
};
```
