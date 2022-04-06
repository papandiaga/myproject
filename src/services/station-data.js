export class StationData {
  static async _getStationInfo() {
    const raw = await fetch(
      "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
    );

    const {
      data: { stations }
    } = await raw.json();

    return stations;
  }

  static async _getStationStatus() {
    const raw = await fetch(
      "https://gbfs.citibikenyc.com/gbfs/en/station_status.json"
    );
    const {
      data: { stations }
    } = await raw.json();

    return stations;
  }

  static _mergeStationData([info, status]) {
    const stationCount = info.length;
    const stationData = new Array(stationCount)
      .fill(stationCount)
      .reduce((mergedData, _, i) => {
        mergedData.push({ ...info[i], ...status[i] });
        return mergedData;
      }, []);
    return stationData;
  }

  static async getStations() {
    return Promise.all([this._getStationInfo(), this._getStationStatus()]).then(
      this._mergeStationData
    );
  }
}
