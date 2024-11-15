import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import axios from 'axios';


const CodeEditor = (props) => {
  const input=props.data1;
  const output=props.data2;
  
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [testCaseResults, setTestCaseResults] = useState([]);

  const checkCode = () => {
    console.log(value);
    
    axios
      .post('http://localhost:8000/python', { value,input,output, })
      .then(({ data }) => {
        console.log(data.testCaseResults);
        setTestCaseResults(data.testCaseResults[0]);
      })
      .catch((err) => console.log(err));
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

 

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="100%">
          <div >
          <div className="flex space-x-2">
            {testCaseResults.map((res, i) => {
              return (
                <div key={i}>
                  <div>{res === 'True' ? '✅ passed' : '❌ failed'}</div>
                </div>
              );
            })}
          </div>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            weidth="100px"
            theme="vs-dark"
            language="python"
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
           <div
            onClick={() => checkCode()}
            className="border-2 p-2 bg-green-600"
          >
            Submit Code
          </div>
          <h1> {value}</h1>
           </div>
        </Box>
       
      </HStack>
    </Box>
  );
};
export default CodeEditor;
