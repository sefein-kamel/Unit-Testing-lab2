import calculateHeroStrengthPower from "../../utils/heroStrength"
import "./Heroes.css"
export default function Heroes({heroes}){
    if (!heroes || heroes.length==0) return <p>No heroes available</p>

    return(
        <ul className="hero-list">
            {heroes.map(hero=>(
                <li key={hero.id}> {hero.name}: power={calculateHeroStrengthPower(hero.strength)} </li>
            ))}
        </ul>
    )
}