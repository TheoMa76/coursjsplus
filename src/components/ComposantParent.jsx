import React, { useState } from 'react'

export default function ComposantParent() {
    const [isTermAccepted, setIsTermAccepted] = useState(false);
    
  return (<form>
    <CGUCheckbox checkded={isTermAccepted} onCheck={setIsTermAccepted}></CGUCheckbox>
    <button disabled={!isTermAccepted}>Envoyer le formulaire</button>
    </form>)

    function CGUCheckbox({checked,onCheck}){
        return(
            <div>
                <label>
                    <input type="checkbox"
                    onChange={(e) => onCheck(e.target.checked)}
                    checked={checked}
                    />
                    Accepter les conditions d'utilisations
                </label>
            </div>
        )
    }

}
