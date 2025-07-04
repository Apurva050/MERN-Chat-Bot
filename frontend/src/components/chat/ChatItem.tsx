import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string): string[] {
  if (message.includes("```")) {
    return message.split("```");
  }
  return [message];
}

function isCodeBlock(str: string = ""): boolean {
  return (
    typeof str === "string" &&
    (str.includes("=") ||
      str.includes(";") ||
      str.includes("[") ||
      str.includes("]") ||
      str.includes("{") ||
      str.includes("}") ||
      str.includes("#") ||
      str.includes("//"))
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  const avatarText =
    auth?.user?.name?.split(" ")[0]?.[0] +
    (auth?.user?.name?.split(" ")[1]?.[0] || "");

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {messageBlocks.map((block, idx) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter key={idx} style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={idx} sx={{ fontSize: "20px" }}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {avatarText}
      </Avatar>
      <Box>
        {messageBlocks.map((block, idx) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter key={idx} style={coldarkDark} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={idx} sx={{ fontSize: "20px" }}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
