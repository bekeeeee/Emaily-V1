const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// m@g.com, 
//[m@g.com," "]
//[m@g.com,""]

export default (emails) => {
  let invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email && re.test(email) === false);
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
  return;
};
