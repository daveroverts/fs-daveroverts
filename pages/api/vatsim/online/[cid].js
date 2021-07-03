const axios = require('axios').default

export default async function handler(req, res) {
  const { cid } = req.query

  try {
    const statusRes = await axios('https://status.vatsim.net/status.json');
    const dataFeeds = statusRes.data.data.v3;
    const dataFeed = dataFeeds[Math.floor(Math.random() * dataFeeds.length)];

    const dataFeedRes = await axios(dataFeed);

    const controller = dataFeedRes.data.controllers.find(data => data.cid == cid)

    if (controller !== undefined) {
      res.status(200).json({
        callsign: controller.callsign,
        depArr: null
      })
    }

    const pilot = dataFeedRes.data.pilots.find(data => data.cid == cid)

    if (pilot !== undefined) {
      res.status(200).json({
        callsign: pilot.callsign,
        depArr: `${pilot.flight_plan.departure} - ${pilot.flight_plan.arrival}`
      })
    }

    res.status(200).json({
      callsign: null,
      depArr: null
    })

  } catch (error) {
    console.log(error)
  }

  res.end()
}