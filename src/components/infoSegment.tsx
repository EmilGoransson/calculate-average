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
                    <AccordionTrigger>How is the grade calculated?</AccordionTrigger>
                    <AccordionContent>
                        sum (grade x (hp))/[sum (hp)]
                        <div onClick={()=>{window.open("https://www.kth.se/student/studier/utlandsstudier/utbyte/behorighet-och-urval-for-utbytesstudier-1.1090201", "_blank")}}> <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">Source</Button>
                            </HoverCardTrigger>
                        </HoverCard></div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is any data saved?</AccordionTrigger>
                    <AccordionContent>
                        "Nope! Everything happens locally on your web browser <div
                                                                                                              onClick={() => {
                                                                                                                  window.open("https://github.com/EmilGoransson/calculate-average", "_blank")
                                                                                                              }}>
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">Source code</Button>
                            </HoverCardTrigger>
                        </HoverCard></div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Why is one or more courses missing?</AccordionTrigger>
                    <AccordionContent>
                        Probably due to poor coding, or alternatively, it’s a course you received an F in that doesn’t contain any approved sub-modules (it doesn’t show up in the PDF file then).                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
