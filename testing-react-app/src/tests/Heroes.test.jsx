
import { render, screen } from "@testing-library/react"
import {  expect} from "vitest"
import Heroes from "../components/Heroes/Heroes"

describe("Heroes component",()=>{

    it("should be rendered without heroes",()=>{
        render(<Heroes />)

        expect( screen.getByText(/no heroes/i)).toBeInTheDocument()
    })
    it("should be rendered without heroes",()=>{
        let heroesMock=[
            {id:100,name:"super man",strength:10},
            {id:110,name:"bat man",strength:20},
        ]
        render(<Heroes heroes={heroesMock}/>)

        expect( screen.queryByText(/no heroes/i)).not.toBeInTheDocument()
        expect(screen.getByRole("list")).toBeInTheDocument()
        let liTags=screen.getAllByRole("listitem")
        expect(liTags).toHaveLength(2)
        expect(liTags[0].textContent).toContain(heroesMock[0].name)
    })
})