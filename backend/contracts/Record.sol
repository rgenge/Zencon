pragma solidity >=0.4.17;

contract Record {   

    struct Clients{         //new
        string  name;
        string  phone;
        string  gender;
        string  location;
        string  taxnumber;
        address addr;
    } 
    struct Forms{              //new
        string   date;
        string   due;
        string   why;
        string   plan;
        string   description;
        address  clientaddr;
    }
    struct Payment{              //new
        string   date;
        string   amount;
        string   pay_id;
        address  clientaddr;
    }
                          //new
    
    address public owner;

    address[] public clientList; //new
    address[] public formsList; //new
    address[] public paymentsList; //new


    mapping(address => Forms) forms; //new
    mapping(address => Clients) clients; //new 
    mapping(address => Payment) payments; //new 


    mapping(address=>mapping(address=>bool)) isApproved;

    mapping(address => bool) isClient; //new

    uint256 public clientCount = 0; //new
    uint256 public formsCount = 0;
    uint256 public paymentsCount = 0;
    
    function Record() public {
        owner = msg.sender;
    }
    
    function setClient(string _name, string _phone, string _gender, string _location, string _taxnumber) public {
        require(!isClient[msg.sender]);
        var cl = clients[msg.sender];

        cl.name      = _name;
        cl.phone     = _phone;
        cl.gender    = _gender;
        cl.location  = _location;
        cl.taxnumber = _taxnumber;
        cl.addr      = msg.sender;

        clientList.push(msg.sender);
        isClient[msg.sender] = true;
        clientCount++;
    }
     function getClients () public view returns(address[]) {
        return (clientList);
    }
    function setForm(address _addr, string _date, string _due, string _why, string _plan, string _description) public {
        require(isClient[msg.sender]);
        var f = forms[_addr];
    
        f.clientaddr = _addr;
        f.date = _date;
        f.due = _due;
        f.why = _why;
        f.plan = _plan;
        f.description = _description;

        formsList.push(_addr);
        formsCount++;
    }
    function getForms() public view returns(address[]) {
        return formsList;
    }
    function setPayment(address _addr, string _date, string _amount, string _pay_id) public {
        require(isClient[msg.sender]);
        var p = payments[_addr];
    
        p.clientaddr = _addr;
        p.date = _date;
        p.amount = _amount;
        p.pay_id = _pay_id;

        paymentsList.push(_addr);
        paymentsCount++;
    }
    function getPayment() public view returns(address[]) {
        return paymentsList;
    }

   
    //Search for client forms and payment data
    function searchClient(address _address) public view returns(address, string, string, string, string, string) {
        var f = forms[_address];
        var cl = clients[f.clientaddr];

        return (f.clientaddr, cl.name, cl.phone, cl.gender, cl.location, cl.taxnumber);
    }
    function searchForms(address _address) public view returns(address, string, string, string, string) {
        var f = forms[_address];

        return (f.clientaddr, f.date, f.due, f.plan, f.description);
    }
    function searchPayment(address _address) public view returns(address, string, string, string) {
        var p = payments[_address];

        return (p.clientaddr, p.date, p.amount, p.pay_id);
    }

    //Retrieve count info 
    function getClientCount() public view returns(uint256) {
        return clientCount;
    }
    function getFormsCount() public view returns(uint256) {
        return formsCount;
    }
    function getPaymentsCount() public view returns(uint256) {
        return paymentsCount;
    }
}