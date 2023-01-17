import { Avatar, Button, CircularProgress } from "@mui/material";
import React from "react";
import moment from "moment";
import "./notification.css";

function Notification({
  notificationLoader,
  notifications,
  notificationNavigateHandler,
  notificationButtonHandler,
  notificationButtonLoader,
}) {
  let imageURL;
  if (process.env.NODE_ENV === "development") {
    imageURL = process.env.REACT_APP_DEV_URI;
  } else {
    imageURL = process.env.REACT_APP_PROD_URI;
  }
  return (
    <div className="notification-wrapper">
      <div className="title">
        <p>Notifications</p>
      </div>
      {notifications?.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          You do not have any notifications
        </p>
      ) : (
        <>
          {notificationLoader ? (
            <div className="loader">
              <CircularProgress />
            </div>
          ) : (
            <>
              {notifications
                ?.slice(0)
                ?.reverse()
                ?.map((notification, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        notificationNavigateHandler(
                          notification.notificationType,
                          notification.postId,
                          notification.communityId,
                          notification.userTo,
                          notification.userBy
                        )
                      }
                      className="notification-container"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Avatar
                          alt={notification?.notificationInfo?.userByName?.toUpperCase()}
                          variant="circle"
                          src={`${imageURL}/render/image/${notification?.notificationInfo?.userByPicture}`}
                        />
                        <p>
                          <strong>
                            {notification?.notificationInfo?.userByName}
                          </strong>{" "}
                          {notification?.notificationInfo?.text} <br />
                          <span style={{ fontSize: "11px", color: "grey" }}>
                            {moment(notification?.createdAt).fromNow()}
                          </span>
                        </p>
                      </div>
                      {notification?.notificationInfo?.postPicture !== null ? (
                        <Avatar
                          sx={{ width: "70px", height: "70px" }}
                          alt="notification"
                          variant="square"
                          src={`${imageURL}/render/image/${notification?.notificationInfo?.postPicture}`}
                        />
                      ) : null}
                      {notification?.notificationType ===
                      "inviteUserForCommunity" ? (
                        <>
                          {notificationButtonLoader ? (
                            <>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                disabled
                              >
                                Accept
                              </Button>
                              <Button
                                sx={{ marginLeft: "10px" }}
                                variant="contained"
                                size="small"
                                color="error"
                                disabled
                              >
                                Decline
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={(e) =>
                                  notificationButtonHandler(
                                    "invite-request-button-clicked",
                                    notification?._id,
                                    "accept",
                                    e
                                  )
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                sx={{ marginLeft: "10px" }}
                                variant="contained"
                                size="small"
                                color="error"
                                onClick={(e) =>
                                  notificationButtonHandler(
                                    "invite-request-button-clicked",
                                    notification?._id,
                                    "reject",
                                    e
                                  )
                                }
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </>
                      ) : null}
                    </div>
                  );
                })}
            </>
          )}
        </>
      )}

      {/* {notificationLoader ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
      <></>
      )} */}
    </div>
  );
}

export default Notification;
