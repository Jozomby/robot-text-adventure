export const DesignTerminalConversation = {
    "name": "DesignTerminalConversation",
    "tree": {
        "prompt": "Booting up... Welcome to Citizen Design.  Please select an option.",
        "options": [
            {
                "prompt": "View current schematics",
                "action": "converse",
                "converse": {
                    "prompt": "The People's Representative is designed with a complete and full understanding of the needs, wants, and opinions of the members of their sector. This eliminates the need for the average citizen to concern themselves with political matters. The People's Representative is currently equipped with: $SAVED_INVENTORY",
                    "options": [
                        {
                            "prompt": "Back",
                            "action": "back"
                        }
                    ]
                }
            },
            {
                "prompt": "Edit schematics",
                "action": "converse",
                "converse": {
                    "prompt": "This interface will allow you to add various accessories to the design of the People's Representative. If you have any compatible accessories, they will be listed below and you may select them to add to the schematic.",
                    "options": [
                        {
                            "prompt": "[$UNSAVED_INVENTORY]",
                            "action": "addToSavedInventory"
                        },
                        {
                            "prompt": "Back",
                            "action": "back"
                        }
                    ]
                }
            },
            {
                "prompt": "View logs",
                "action": "list",
                "list": [
                    "July 15. The People's Representative is proving insufficiently empathetic towards minority groups in their sector. The empathy module has been upated.",
                    "September 2. There was an incident where, when asked to deliver news of ration cuts to their sector, the Represetative phrased the message poorly and a riot was instigated. The tact module will need to be rewritten.",
                    "September 14. Compartments have been added to allow the Representative to carry necessary items and accessories",
                    "September 28. The updated tact module has been installed. It was necessary to install an override to the honesty subroutine in order to support the rewritten module.",
                    "October 7. The Representative gave inappropriate assurances to disaffected splinter groups in their sector. The empathy module has been updated to only include positions covered by the Charter of Free Speech.",
                    "October 19. Power usage has been improved and effective range greatly increased.",
                    "November 23. Owing to the new Measures to Promote Unity, the Representative will need an updated vocabulary database.",
                    "December 15. The long lapses between behavioral updates are problematic when it comes to preserving unity with the Consensus. Henceforth all updates will be trasmitted automatically. This program will only be used for hardware upgrades.",
                ]
            },
            {
                "prompt": "Exit",
                "action": "end"
            }
        ]
    }
}