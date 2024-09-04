# OBS Scheduler

OBS Scheduler is an open-source Electron application designed to automate and schedule various OBS (Open Broadcast Software) functions such as starting a transmission, switching scenes, and ending a transmission at predetermined times. This tool is especially useful for streamers and broadcasters who require precise control over their broadcasting schedule.

## Features

- **Start Transmission:** Schedule the exact time to begin your live stream.
- **Switch Scenes:** Automate the process of switching scenes during a live broadcast.
- **End Transmission:** Set a specific time to end your stream.
- **User-Friendly Interface:** Easy-to-use GUI for setting up and managing schedules.
- **Cross-Platform:** Works on Windows, MacOS, and Linux.

## Getting Started

### Prerequisites

- OBS Studio installed and configured.
- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/felipeandrademorais/obsSchedulerApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd obsSchedulerApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Usage

1. **Configure OBS WebSocket Plugin:**
   Ensure that the OBS WebSocket plugin is installed and configured correctly in OBS Studio to allow communication between OBS and OBS Scheduler.

2. **Configure the OBS Connection:**

   - Click on the ‘Settings’ button.
   - Fill in the options for OBS IP, port, and password.
   - Click 'Connect'.
   - If everything is configured correctly, you will be redirected to the home screen.

3. **Schedule a Start Transmission:**

   - Click on the 'Start Transmission’ button.
   - Fill in a name for this task and set a specific time.
   - Save the task.

4. **Schedule a Switch Scene:**

   - Click on the 'Switch Scene' button.
   - Select a scene to switch and set a specific time.
   - Save the task.

5. **Schedule an End Transmission:**

   - Click on the 'End Transmission' button.
   - Fill in a name for this task and set a specific time.
   - Save the task.

6. **Manage Tasks:**
   - View all scheduled tasks in the main interface.
   - Delete tasks as needed.

## Images and Videos

![Video](https://github.com/user-attachments/assets/23c2c4ea-b4e7-4b28-8990-2bc67da85e47)

<br>

![Screenshot at Sep 04 13-34-38](https://github.com/user-attachments/assets/112b5212-56c2-466e-821d-624d15fa07d4)

<br>

![Screenshot at Sep 04 13-35-09](https://github.com/user-attachments/assets/5eaecaec-80b7-4840-972f-d9e8241aa6a4)

<br>

![Screenshot at Sep 04 13-35-31](https://github.com/user-attachments/assets/ee15eafb-7075-483b-b144-e135f529e8db)

<br>

![Screenshot at Sep 04 13-36-04](https://github.com/user-attachments/assets/b0cffaae-a5aa-49ad-82db-ba9020b5b3a7)

<br>

![Screenshot at Sep 04 13-38-20](https://github.com/user-attachments/assets/7863159e-50b3-42b2-88cb-a2f8996bc749)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Felipe Andrade de Morais - [@felipeandradedemorais](https://www.linkedin.com/in/felipeandradedemorais/)

Project Link: [https://github.com/felipeandrademorais/obsSchedulerApp.git](https://github.com/felipeandrademorais/obsSchedulerApp.git)
