import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    HoverCard,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {Button} from "@/components/ui/button.tsx";

export default function InfoSegment() {
    return (
        <div className="p-4 rounded-lg">

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Hur räknas betyget ut?</AccordionTrigger>
                    <AccordionContent>
                        summa (betyg x (antal obligatoriska poäng))/[summa (antal obligatoriska poäng)]
                        <div onClick={()=>{window.open("https://www.kth.se/student/studier/utlandsstudier/utbyte/behorighet-och-urval-for-utbytesstudier-1.1090201", "_blank")}}> <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">Källa</Button>
                            </HoverCardTrigger>
                        </HoverCard></div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Sparas någon data?</AccordionTrigger>
                    <AccordionContent>
                        Nej! Allt sker lokalt på din webläsare. Kika gärna på källkoden om du är osäker. <div
                                                                                                              onClick={() => {
                                                                                                                  window.open("https://github.com/EmilGoransson/calculate-average", "_blank")
                                                                                                              }}>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">Github</Button>
                            </HoverCardTrigger>
                        </HoverCard></div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Varför saknas det en kurs?</AccordionTrigger>
                    <AccordionContent>
                        Antagligen på grund av dåligt kodande, alternativt att det är en kurs du fått F i som inte innehåller några godkända del-moduler (dyker inte upp på PDF-filen då)
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
