const response200 = {
    "success": true,
    "customer": "cus_TZi4fmW2W5i8rg",
    "canceledSubscriptions": [
        {
            "id": "sub_1ScYdxRIYLjFPeIa19tLMj7O",
            "object": "subscription",
            "application": null,
            "application_fee_percent": null,
            "automatic_tax": {
                "disabled_reason": null,
                "enabled": false,
                "liability": null
            },
            "billing_cycle_anchor": 1765316425,
            "billing_cycle_anchor_config": null,
            "billing_mode": {
                "flexible": null,
                "type": "classic"
            },
            "billing_thresholds": null,
            "cancel_at": null,
            "cancel_at_period_end": false,
            "canceled_at": 1772589081,
            "cancellation_details": {
                "comment": null,
                "feedback": null,
                "reason": "cancellation_requested"
            },
            "collection_method": "charge_automatically",
            "created": 1765316425,
            "currency": "usd",
            "current_period_end": 1773092425,
            "current_period_start": 1770673225,
            "customer": "cus_TZi4fmW2W5i8rg",
            "customer_account": null,
            "days_until_due": null,
            "default_payment_method": "pm_1ScYdwRIYLjFPeIakOroqYhh",
            "default_source": null,
            "default_tax_rates": [],
            "description": null,
            "discount": null,
            "discounts": [],
            "ended_at": 1772589081,
            "invoice_settings": {
                "account_tax_ids": null,
                "issuer": {
                    "type": "self"
                }
            },
            "items": {
                "object": "list",
                "data": [
                    {
                        "id": "si_TZi4ZZmFnpfI4L",
                        "object": "subscription_item",
                        "billing_thresholds": null,
                        "created": 1765316425,
                        "current_period_end": 1773092425,
                        "current_period_start": 1770673225,
                        "discounts": [],
                        "metadata": {},
                        "plan": {
                            "id": "price_1ScXq7RIYLjFPeIazfgKKVea",
                            "object": "plan",
                            "active": true,
                            "aggregate_usage": null,
                            "amount": 200,
                            "amount_decimal": "200",
                            "billing_scheme": "per_unit",
                            "created": 1765313335,
                            "currency": "usd",
                            "interval": "month",
                            "interval_count": 1,
                            "livemode": true,
                            "metadata": {},
                            "meter": null,
                            "nickname": "Precio de Pruebas con tarjeta real",
                            "product": "prod_TZhEz2iK3YbZqB",
                            "tiers_mode": null,
                            "transform_usage": null,
                            "trial_period_days": null,
                            "usage_type": "licensed"
                        },
                        "price": {
                            "id": "price_1ScXq7RIYLjFPeIazfgKKVea",
                            "object": "price",
                            "active": true,
                            "billing_scheme": "per_unit",
                            "created": 1765313335,
                            "currency": "usd",
                            "custom_unit_amount": null,
                            "livemode": true,
                            "lookup_key": null,
                            "metadata": {},
                            "nickname": "Precio de Pruebas con tarjeta real",
                            "product": "prod_TZhEz2iK3YbZqB",
                            "recurring": {
                                "aggregate_usage": null,
                                "interval": "month",
                                "interval_count": 1,
                                "meter": null,
                                "trial_period_days": null,
                                "usage_type": "licensed"
                            },
                            "tax_behavior": "unspecified",
                            "tiers_mode": null,
                            "transform_quantity": null,
                            "type": "recurring",
                            "unit_amount": 200,
                            "unit_amount_decimal": "200"
                        },
                        "quantity": 1,
                        "subscription": "sub_1ScYdxRIYLjFPeIa19tLMj7O",
                        "tax_rates": []
                    }
                ],
                "has_more": false,
                "total_count": 1,
                "url": "/v1/subscription_items?subscription=sub_1ScYdxRIYLjFPeIa19tLMj7O"
            },
            "latest_invoice": "in_1Sz2CqRIYLjFPeIaoAX7KqAI",
            "livemode": true,
            "metadata": {},
            "next_pending_invoice_item_invoice": null,
            "on_behalf_of": null,
            "pause_collection": null,
            "payment_settings": {
                "payment_method_options": {
                    "acss_debit": null,
                    "bancontact": null,
                    "card": {
                        "network": null,
                        "request_three_d_secure": "automatic"
                    },
                    "customer_balance": null,
                    "konbini": null,
                    "payto": null,
                    "sepa_debit": null,
                    "us_bank_account": null
                },
                "payment_method_types": [
                    "card"
                ],
                "save_default_payment_method": "off"
            },
            "pending_invoice_item_interval": null,
            "pending_setup_intent": null,
            "pending_update": null,
            "plan": {
                "id": "price_1ScXq7RIYLjFPeIazfgKKVea",
                "object": "plan",
                "active": true,
                "aggregate_usage": null,
                "amount": 200,
                "amount_decimal": "200",
                "billing_scheme": "per_unit",
                "created": 1765313335,
                "currency": "usd",
                "interval": "month",
                "interval_count": 1,
                "livemode": true,
                "metadata": {},
                "meter": null,
                "nickname": "Precio de Pruebas con tarjeta real",
                "product": "prod_TZhEz2iK3YbZqB",
                "tiers_mode": null,
                "transform_usage": null,
                "trial_period_days": null,
                "usage_type": "licensed"
            },
            "quantity": 1,
            "schedule": null,
            "start_date": 1765316425,
            "status": "canceled",
            "test_clock": null,
            "transfer_data": null,
            "trial_end": null,
            "trial_settings": {
                "end_behavior": {
                    "missing_payment_method": "create_invoice"
                }
            },
            "trial_start": null
        }
    ]
};

export { response200 };