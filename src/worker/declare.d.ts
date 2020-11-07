declare module 'comlink-loader!*' {
  class WebpackWorker extends Worker {
    constructor();

    async initData({
      startWeekOfDays,
    }: import('../model/typing').InitWorkerDataProps): Promise<
      import('../model/typing').InitWorkerData
    >;

    createWeekTable({
      rawData,
      interval,
      startWeekOfDays,
    }: import('../model/typing').CreateWeekTableProps): Promise<
      import('../model/typing').CreateWeekTable
    >;
  }

  export = WebpackWorker;
}
