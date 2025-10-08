import { describe, it, expect }from "vitest"
import  calculateHeroStrengthPower from "../utils/heroStrength"


describe("heroStrength function",()=>{
    it("should return '5 (weak)' when passing 5",()=>{
        expect(calculateHeroStrengthPower(5)).toMatch(/weak/)
    })
    it("should return '15 (strong)' when passing 15",()=>{
        expect(calculateHeroStrengthPower(15)).toMatch(/strong/)
    })
    it("should return '25 (strong)' when passing 25",()=>{
        expect(calculateHeroStrengthPower(25)).toMatch(/unbelievable/)
    })
})