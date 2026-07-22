// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title InvoiceSettlement
/// @notice Escrow-based invoice settlement between a supplier and a buyer.
/// Mirrors the four contract stages shown in the UI demo: Created, Verified,
/// Approved, Executed. The buyer funds the contract at deployment; the
/// escrowed amount is released to the supplier once conditions are met.
contract InvoiceSettlement {
    enum Status {
        Created,
        Verified,
        Approved,
        Executed
    }

    address public immutable buyer;
    address public immutable supplier;
    uint256 public immutable amount;
    string public invoiceReference;

    Status public status;
    bool public deliveryConfirmed;
    bool public qualityApproved;

    event DeliveryConfirmed(uint256 timestamp);
    event ConditionsVerified(uint256 timestamp);
    event SettlementApproved(uint256 timestamp);
    event PaymentExecuted(address indexed to, uint256 amount, uint256 timestamp);

    modifier onlyBuyer() {
        require(msg.sender == buyer, "InvoiceSettlement: caller is not the buyer");
        _;
    }

    modifier onlySupplier() {
        require(msg.sender == supplier, "InvoiceSettlement: caller is not the supplier");
        _;
    }

    modifier atStatus(Status expected) {
        require(status == expected, "InvoiceSettlement: invalid stage for this action");
        _;
    }

    constructor(address _supplier, string memory _invoiceReference) payable {
        require(_supplier != address(0), "InvoiceSettlement: supplier is zero address");
        require(msg.value > 0, "InvoiceSettlement: funding amount must be greater than zero");

        buyer = msg.sender;
        supplier = _supplier;
        amount = msg.value;
        invoiceReference = _invoiceReference;
        status = Status.Created;
    }

    /// @notice Supplier submits proof that goods were delivered.
    function confirmDelivery() external onlySupplier atStatus(Status.Created) {
        deliveryConfirmed = true;
        emit DeliveryConfirmed(block.timestamp);
    }

    /// @notice Buyer verifies the delivered goods match the agreed purchase order.
    function verifyConditions() external onlyBuyer atStatus(Status.Created) {
        require(deliveryConfirmed, "InvoiceSettlement: delivery not yet confirmed");
        qualityApproved = true;
        status = Status.Verified;
        emit ConditionsVerified(block.timestamp);
    }

    /// @notice Once conditions are verified, settlement is approved.
    function approveSettlement() external atStatus(Status.Verified) {
        require(qualityApproved, "InvoiceSettlement: conditions not verified");
        status = Status.Approved;
        emit SettlementApproved(block.timestamp);
    }

    /// @notice Releases the escrowed funds to the supplier.
    function executePayment() external atStatus(Status.Approved) {
        status = Status.Executed;
        (bool sent, ) = supplier.call{value: amount}("");
        require(sent, "InvoiceSettlement: payment transfer failed");
        emit PaymentExecuted(supplier, amount, block.timestamp);
    }
}
