import Form from "next/form";

type prompts = {
    className : string;
}
function OnSubmit() {
    /*submit data to backend*/

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