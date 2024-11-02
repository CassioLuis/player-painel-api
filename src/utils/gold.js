export default class Gold {
  static calc (transactionAmount) {
    return (transactionAmount * 1000 * 100) * 2 // 1 real 1000 gold, 100 = quantidade de pratas para totalizar 1 gold
  }
}