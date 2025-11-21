type prompts = {
    title: string
    function: () => void;
}
export default function Button(
    {title, className}: { title: string, className?: string }
){
    return (
        <Button title={title} className={className}>

        </Button>
    )
}