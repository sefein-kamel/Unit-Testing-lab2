import { render, screen } from "@testing-library/react"
import Counter from "../components/Counter/Counter"
import { beforeEach, expect } from "vitest"
import userEvent from "@testing-library/user-event"


describe("Counter component",()=>{
    beforeEach(()=>{
        render(<Counter />)
    })
    it("should be rendered",()=>{
        

        let btns =screen.getAllByRole("button")
        expect(btns).toHaveLength(3)
        expect(screen.getByRole("heading")).toHaveTextContent(0)
    })
    it("should increase count after click btn+",async ()=>{
       

        let btn =screen.getByRole("button",{name:"Increment"}) //screen.getByText("+")
       await userEvent.click(btn)
       await userEvent.click(btn)
       await userEvent.click(btn)
        expect(screen.getByRole("heading")).toHaveTextContent(3)
    })
})