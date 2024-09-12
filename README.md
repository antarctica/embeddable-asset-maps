# BAS Asset Tracking Map

This project is a single-page application (SPA) built with React, ArcGIS JS API and Vite. It allows for tracking and displaying the real-time locations of British Antarctic Survey (BAS) assets, including ships, aircraft, and vehicles. The application provides embeddable maps for easy integration into public websites like the BAS public website and internal BAS info screens, dynamically updating the asset positions without manual intervention.

### Quick Start
To set up the project locally, follow these steps:

```shell
npm install
npm run dev
```

### About this codebase:
The BAS Asset Tracking Map is built using `React` and `Vite`, leveraging `TanStack Router` to manage query parameters for asset identification and rendering. The styling is powered by `Panda CSS` in combination with the `BAS Style Kit` to maintain consistent design aesthetics.

#### Key Features
- Dynamic Asset Tracking: Displays real-time locations of BAS assets such as ships, aircraft, and vehicles.
- Embeddable Maps: The maps are designed to be easily embedded into public websites, like Ice Flow.
- Automatic Centering and Basemap Selection: The map centers on the current position of an asset automatically and selects the most relevant basemap based on the asset's location (e.g., Arctic or Antarctic regions).
- The application is optimized for size and simplicity, focusing on essential functionalities and a clean user experience.

## License

Copyright (c) 2024 UK Research and Innovation (UKRI), British Antarctic Survey (BAS).

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
