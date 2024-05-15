import React from "react";
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  
  return (
    <SideBlock title="Комментарии">
      <List>
        
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
              {obj && (
                <ListItem alignItems="flex-start" key={index}>
                  {obj.userId && (
                    <React.Fragment>
                      {/* Добавляем компонент Avatar для отображения аватара пользователя */}
                      <Avatar alt={obj.userId.fullName} src={obj.userId.avatarUrl} />
                      <ListItemText
                        primary={obj.userId.fullName}
                        secondary={obj.content}
                      />
                    </React.Fragment>
                  )}
                </ListItem>
              )}
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
      </List>
      {children}
    </SideBlock>
  );
};

