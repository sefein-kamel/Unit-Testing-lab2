
import { render, screen } from "@testing-library/react"
import Button from "../components/Button/Button"
import {  vi } from "vitest"
import userEvent from "@testing-library/user-event"

describe("Button component",()=>{

    it("should be rendered",()=>{
        render(<Button> click me  </Button>)

        //access tags
       let btn= screen.getByRole("button")
        //matchers
        expect(btn).toBeInTheDocument()
        expect(btn).toHaveTextContent("click me")
    })
    it("should call click handler after clicking btn",async ()=>{
        let handlerClick=vi.fn()//mock + spy
        render(<Button onClick={handlerClick}>click</Button>)

        //access btn
       let btn= screen.getByRole("button")
        //fire click
       await userEvent.click(btn)
        //handler click
        expect(handlerClick).toHaveBeenCalled()
    })
})