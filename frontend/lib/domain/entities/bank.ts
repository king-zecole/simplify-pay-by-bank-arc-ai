// Domain Entity - Bank
// Clean Architecture: Core business entity

export interface Bank {
  id: string
  name: string
  code: string
  logo: string
  color: string
}

// Factory Pattern for creating bank instances
export class BankFactory {
  static createBank(id: string, name: string, code: string, logo: string, color: string): Bank {
    return { id, name, code, logo, color }
  }

  static getAvailableBanks(): Bank[] {
    return [
      this.createBank("1", "Santander", "SANT", "🏦", "#ec0000"),
      this.createBank("2", "Barclays", "BARC", "🏛️", "#00aeef"),
      this.createBank("3", "Lloyds", "LLOY", "🐴", "#006a4d"),
      this.createBank("4", "HSBC", "HSBC", "🔺", "#db0011"),
    ]
  }
}
