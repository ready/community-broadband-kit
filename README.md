<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/82117023/164050250-34c6c370-2bba-413c-9655-61437820f094.svg" alt="Ready Logo">
</p>
<h1 align="center" style="margin-top: 0px;">
  Community Broadband Kit &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="version" src="https://img.shields.io/static/v1?label=Version&color=740e86&labelColor=555555&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAggAAAIIBsKhZvgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFsSURBVCiRjZK9S9VxFMY/53df7EVocchBuIMtZtDUEA0N/QlKtIRUY2IOpYvQVIOLQZvU0OAiIlFDYM130oiIhMhRLmZBinC7eu+n5fuzy7036pnO23PO4TwHekA9p75S19TzvWo6Cf3qQ7XuHzTUJ+qZXoRMvanWUvEXdVy9pn5KsV11Si3kpLK6mpI/1Qdqua1pnzqj7qWaFbUU6ilgH1gG7kVE7fGsw8qjaHHiCKbn5uOrOggsAGNAfzE1zoCTEVG7P7lxwxaLwGkDCnB14vq72xGxnIZkAEU6sP1j7cr30odvlYHxzaPD5mH14+LA3kHtctroGF1EgHpjp7K5/XRoa2u38DcFsu4LswE02kK/size/5O4tDTzDGIUeA2sNpvNkWp1/oV6Fqi0TbCkrqsvk3+xQ45ykiiXY10t5clMvZTshfwBkl9U76qf1Ttq15Z5k1vpzVrqW3X0v44TEc+BC8AboN5xqGP8BvQuJ7II6OtVAAAAAElFTkSuQmCC&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=1.10.8" />
</h1>
<p align="center">
  <img alt="staleBranches" src="https://img.shields.io/static/v1?label=Stale%20Branches&color=33ab53&labelColor=555555&logo=Git&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=0" /> &nbsp;
  <img alt="neglectedPrs" src="https://img.shields.io/static/v1?label=Neglected%20PRs&color=33ab53&labelColor=555555&logo=Git%20Extensions&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=0" /> &nbsp;
  <img alt="lastProd" src="https://img.shields.io/static/v1?label=Last%20Prod&color=7dcf46&labelColor=555555&logo=Android%20Auto&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=11/16/22" />
</p>
<p align="center">
  <img alt="vulnerabilities" src="https://img.shields.io/static/v1?label=Vulnerabilities&color=33ab53&labelColor=555555&logo=Amazon%20Cloudwatch&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=0" /> &nbsp;
  <img alt="deprecations" src="https://img.shields.io/static/v1?label=Deprecations&color=33ab53&labelColor=555555&logo=Git%20LFS&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=0" />
</p>
<p align="center">
  <img alt="nodeVersion" src="https://img.shields.io/static/v1?label=Node%20Version&color=5c80f7&labelColor=555555&logo=Node.js&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=16.18.1" /> &nbsp;
  <img alt="npmVersion" src="https://img.shields.io/static/v1?label=NPM%20Version&color=5c80f7&labelColor=555555&logo=npm&logoColor=ffffff&logoWidth=14&style=for-the-badge&message=8.3.1" /> &nbsp;
</p>



---

### ⚡️ [Launch Your Own Community Broadband Kit](https://broadband.money/community-broadband-kit)
### 👁 [View a live, generic instance of the Kit](https://toolkit.broadband.money)
### 📖 [Learn How To Setup & Distribute Your Kit](https://broadband.money/broadband-grant-guides/community-kit)

---
## What is the Community Broadband Kit?

The Community Broadband Kit bundles together an internet speed test and a broadband feasibility survey to gather data around the need for better broadband access in a specific community. 

Community Broadband Kit verifies, updates and extends the Broadband Audit within a given broadband grant proposal area. Providers, communities, and government entities can utilize Community Broadband Kit to build their case to challenge Fabric and get ground-truth about the current broadband reality of a proposed grant area.

While communities and providers are encouraged to [launch their own ommunity Broadband Kit](https://broadband.money/community-broadband-kit) for free on hosted infrastructure, this repository is open to allow anyone to inspect how Community Broadband Kit works. It contains the source code for an instance of the kit, which can be deployed with a given community's branding at a domain of its choice, and then distributed to its members. The data gathered by this kit instance is given to the community which instantatiated it in the form of external maps, visualizations, and exporting capabilities, allowing them to gather evidence surrounding the state of broabdband access within their territory. 

### Speed test

The speed test component consists of running three different speed tests in sequence: [M-Lab's ndt7](https://speed.measurementlab.net/#/), [Speedtest by Ookla](https://www.speedtest.net/), and our own speed test which can be found at [WiFi.wtf](https://wifi.wtf/). We run three different speed tests to limit the bias of any single speed test implementation on the results. The results of each the three speed tests can be viewed by the test-taker, along with an overall score determined by taking the median of the three test results in each category (ie. download, upload, latency, jitter).

### Survey

The questions in our broadband feasibility survey were designed in accordance with the [Broadband Mapping Coalition](https://broadbandmappingcoalition.org/) in order to give communities the most useful insight into the current state of their community members' access and need for for better broadband. This survey is completely optional, and is offered simultaneously with the execution of the speed test in order to best utilize the time of the end user.

### Data collection

In addition to speed test data and survey results, this test also collects the end user's ip address, isp name, city-level location as determined from the ip address, as well as information found in the User-Agent. It is up to the discretion of the community whether to require the test-takers to input their address before beginning the speed test. Collecting address-level data is crucial to being able to accurately map the level of broadband access in a specific community, but this data is not released to the public, nor do we enable communities to export data at an address-level precision.

## Why did we build this?

Communities could steer BEAD and other broadband grants to highest and best use, but few communities are prepared to take on the learning curve, engagement, research and process necessary to do so effectively. 

Communities should have what they need in order to team up with strong local operators and get their share of broadbant grants. This includes knowledge of the allocation process, resources for research, and tools to orchestrate their plan as well as to coordinate community action.
The better we can help communities prepare, the better we can help our nation’s historic public investment flow to the most impactful last-mile projects.

BEAD enables [subsidiarity](https://en.wikipedia.org/wiki/Subsidiarity), but it does not guarantee this ideal as an outcome. 

Effective subsidiarity requires coordinating agents to systematize:

1. The **distribution** of concise, accessible understanding required by the community covering key participatory concepts, from strategic & general to tactical & specific
2. Coordinated **gathering** of local knowledge, data and insights “handed up” to the application model

Both can be facilitated through this Community Broadband Kit. 

## Thank You
Special thank you to the [Broadband Mapping Coalition](https://broadbandmappingcoalition.org) and Dustin Loup for developing and publishing coherent, thoughtful recommended broadband testing methodology guidelines, and to BMC members for feedback on shaping the test. 

## Getting Started

If you are a community-centered organization interested in setting up a kit instance for your community, you can pre-enroll as a "Community Leader" at [broadband.money](https://broadband.money/). If you are approved, your organization will be helped to set up and deploy a kit instance with your own branding and guided in the most effective ways to distribute it. You will also be given access to an admin console where you can see maps and various other visualizations of the results coming through your community's kit instance.

### Setting up a speed test client

If you are only interested in running our speed test sequence, you may follow the instructions below.

Include the files from the directory `static/test` in your project. In order for Speedtest by Ookla to work, you must set up your own [Speedtest Custom](https://www.ookla.com/speedtest-custom) and change the `speedtestCustomLink` in `static/test/ookla.js` to link to your Speedtest Custom test. You can then run the test by calling the asynchronous function `runTests()`.

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

#### Return value

Returns a Promise that will resolve with the following speed test results or throws an error if there was a problem running the test. The upload and download fields of the results object are in Mbps, and the latency and jitter fields are in ms.

```js
{
  rstLatency
  rstJitter
  rstUpload
  rstDownload
  mlabLatency
  mlabJitter
  mlabUpload
  mlabDownload
  ooklaLatency
  ooklaJitter
  ooklaUpload
  ooklaDownload
}

```

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

## <a name="contributing"></a>Contributing

Contributing changes for community-broadband-kit:

- Fork community-broadband-kit and clone locally if you have not already done so
- Create an upstream remote and sync your local copy before you branch
- Create a new branch
- Switch to your new branch
- Develop and test changes using local development server
- Write descriptive commits
- Create a pull request with the packageKey in the title
- To create a pull request you need to push your branch to the origin remote and then click on the create pull request button on Github
- Email dev@ready.net with any questions

### Commit Linting

We following the conventional commits guidelines to make all commit messages in the format of:

```
type(scope?): message
```

Where `type` is one of these following types:

- **build**: Changes that affect the build system or external dependencies, like NPM packages or frameworks
- **ci**: Changes to our CI configuration files and/or scripts
- **chore**: Repo management stuff. Think: housekeeping. Also used for bot commits
- **docs**: Documentation only changes
- **feat**: New feature
- **fix**: Bug fix
- **perf**: Code change that improves performance
- **refact**: Code change that neither fixes a bug nor adds a new feature
- **style**: Changes that do not affect the meaning of the code
- **test**: Adding tests or correcting existing tests
- **typo**: A small mistake that shouldn’t be added to the changelog

And scope is an optional field to link the issue number. These are both examples of valid commit messages:

```
fix(#31): fix bug where something was going wrong
docs: update `README` with information about commit linting
```
