import Form from "next/form";
import Button from "@/app/Components/button";
type prompts = {
    className : string;
}
function OnSubmit(){
    /*submit data to backend (i think)*/
    console.log("the stuff")
}
export default function NewProjectForm(
    {className}: { className?: string }
){
    return (
        <Form action={OnSubmit}>
            <input name="projectName" type="text" placeholder="My New Project" />
            <button className={className}>Create New Project</button>
        </Form>
    )
}