# community-broadband-kit

[Example toolkit instance](https://toolkit.broadband.money/)

## What is the Community Broadband Kit?

The Community Broadband Kit bundles together an internet speed test and a broadband feasibility survey, allowing communities to apply their own branding, distribute it to their community members, and visualize the results. The speed test component consists of running three different speed tests in sequence: M-Lab's ndt7, Speedtest by Ookla, and our own speed test which can be found at [WiFi.wtf](https://wifi.wtf/). We run three different speed tests to limit the bias of any single speed test implementation in the results. 

## Why did we build this?

Communities could steer BEAD to highest and best use, however, few communities are prepared to take on the learning curve, engagement, research and process necessary to do so effectively. 

Communities should have what they need in order to team up with strong local operators and get their share of BEAD. This includes knowledge of the allocation process, resources for research, and tools to orchestrate their plan as well as to coordinate community action.
The better we can help communities prepare, the better we can help our nation’s historic public investment flow to the most impactful last mile projects.

BEAD enables [subsidiarity](https://en.wikipedia.org/wiki/Subsidiarity), but it does not guarantee this ideal as an outcome. 

Effective subsidiarity requires that we systematize:

1. The **distribution** of concise, accessible understanding required by the community covering key participatory concepts, from strategic & general to tactical & specific
2. Coordinated **gathering** of local knowledge, data and insights “handed up” to the application model

Both can be facilitated through a carefully planned, well-distributed Community Broadband Kit. 

If we do our part effectively, we could help hundreds of communities rise up to get their share of BEAD funding.

## Table of Contents

- [Getting Started](#getting-started)
- [How it Works](#how-it-works)
- [Contributing](#contributing)

## <a name="getting-started"></a>Getting Started

### Setting up a speed test client

Include the files from the directory `static/test` in your project. You can then run the test by calling the asynchronous function `runTests()`.

#### Syntax
```js
  runTests(config)
```

#### Parameters
`config`  
An object containing callback functions used to handle progress updates throughout the sequence of speedtests. The `config` object has the following structure.

```js
{
  mlab: {
    downloadProgress,
    downloadComplete,
    uploadProgress,
    uploadComplete
  },
  ookla: {
    complete,
  },
  rst: {
    pingProgress,
    downloadProgress,
    uploadProgress
  },
  error
}
```

##### `config.mlab.downloadProgress`

Parameters: 
`download` The latest download throughput measurement from the M-Lab speed test in Mbps

##### `config.mlab.downloadComplete`

Parameters: 
`download` The final download throughput measurement from the M-Lab speed test in Mbps

##### `config.mlab.uploadProgress`

Parameters: 
`upload` The latest upload throughput measurement from the M-Lab speed test in Mbps

##### `config.mlab.uploadcomplete`

Parameters: 
`upload` The final upload throughput measurement from the M-Lab speed test in Mbps
`latency` The final latency measurement from the M-Lab speed test in ms
`jitter` The final jitter measurement from the M-Lab speed test in ms

##### `config.ooklaComplete`

Parameters: 
`download` The final download throughput measurement from the Ookla speed test in Mbps
`upload` The final upload throughput measurement from the Ookla speed test in Mbps
`latency` The final latency measurement from the Ookla speed test in ms
`jitter` The final jitter measurement from the Ookla speed test in ms

##### `config.rst.pingProgress`

Parameters: 
`latency` The latest latency measurement from the WiFi.wtf speed test in ms
`jitter` The latest jitter measurement from the WiFi.wtf speed test in ms


##### `config.rst.downloadProgress`

Parameters: 
`download` The latest download throughput measurement from the WiFi.wtf speed test in Mbps

##### `config.rst.uploadProgress`

Parameters: 
`upload` The latest upload throughput measurement from the WiFi.wtf speed test in Mbps

#### Example
```js

const config {
  mlab: {
    downloadProgress: (download) => {
      console.log(download + ' Mbps')
    },
    downloadComplete: (download) => {
      console.log(download + ' Mbps')
    },
    uploadProgress: (upload) => {
      console.log(upload + ' Mbps')
    },
    uploadComplete: (upload, latency, jitter) => {
      console.log(upload + ' Mbps')
      console.log(latency + 'ms')
      console.log(jitter + ' ms')
    },
  },
  ooklaComplete: (download, upload, latency, jitter) => {
    console.log(download + ' Mbps')
    console.log(upload + ' Mbps')
    console.log(latency + 'ms')
    console.log(jitter + ' ms')
  },
  rst: {
    pingProgress: (latency, jitter) => {
      console.log(latency + 'ms')
      console.log(jitter + ' ms')
    },
    downloadProgress: (download) => {
      console.log(download + ' Mbps')
    },
    uploadProgress: (upload) => {
      console.log(upload + ' Mbps')
    }
  },
  error: (error) => {
    console.log(error)
  }
}

async function main() {
  try {
    const results = await runTests(config);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

main();
```

## <a name="how-it-works"></a>How it Works


## <a name="contributing"></a>Contributing

Contributing changes for strenghtest:

- Fork community-broadband-kit and clone locally if you have not already done so
- Create an upstream remote and sync your local copy before you branch
- Create a new branch
- Switch to your new branch
- Develop and test changes using local development server
- Write descriptive commits
- Create a pull request with the packageKey in the title
- To create a pull request you need to push your branch to the origin remote and then click on the create pull request button on Github
- Email dev@ready.net with any questions other questions
