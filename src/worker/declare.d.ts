declare module 'comlink-loader!*' {
  class WebpackWorker extends Worker {
    constructor();

    initData(
      data: import('../model/typing').TokyoCoronaData
    ): Promise<import('../model/typing').InitWorkerData>;

    makeDailyCount({
      tokyoData,
      weeks,
      startWeekOfDays,
    }: import('../model/typing').MakeDailyCountProps): Promise<
      import('../model/typing').DailyCount
    >;
  }

  export = WebpackWorker;
}
