/* Creating all of the possible combinations for context scores 
 Could be done in a better way with a series of map functions, or some sort of recursive for loop
This is the quickest/best way I could come up with*/

import {
    typologies,
    participants,
    attributes,
} from "../data-entry-component/data-entry-data";

let ContextScores = {
    attributes: attributes,
    participants: participants,
    typologies: typologies,
    scores: [],
};

for (
    let attributesIndex = 0;
    attributesIndex < attributes.length;
    attributesIndex++
) {
    // Giving room to add average scores for each attribute
    ContextScores.scores.push({
        scoreType: "average",
        attribute: attributes[attributesIndex],
        score: 0,
    });

    for (
        let participantIndex = 0;
        participantIndex < participants.length;
        participantIndex++
    ) {
        for (
            let typologyIndex = 0;
            typologyIndex < typologies.length;
            typologyIndex++
        ) {
            // Giving room to add individual scores for each entry
            ContextScores.scores.push({
                scoreType: "individual",
                attribute: attributes[attributesIndex],
                participant: participants[participantIndex],
                typology: typologies[typologyIndex],
                score: 0,
            });
        }
    }
}
export default ContextScores;
export { typologies, attributes };
