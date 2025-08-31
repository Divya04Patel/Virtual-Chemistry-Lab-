import json
import os

def load_reactions():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(base_dir, 'reactions.json')) as f:
        return json.load(f)

reactions_data = load_reactions()

def simulate_reaction(user_reactants):
    user_set = set(user_reactants)
    for reaction in reactions_data:
        if set(reaction["reactants"]) == user_set:
            return {
                "products": reaction["products"],
                "reactionType": reaction["reactionType"],
                "energy": reaction["energy"],
                "visual": reaction["visual"]
            }
    return {"error": "Reaction not found"}