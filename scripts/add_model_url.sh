model_url="ADD_YOUR_MODEL_URL"
sed -i 's,model_url,'$model_url',g' code.py
echo "Model URL is updated successfully."