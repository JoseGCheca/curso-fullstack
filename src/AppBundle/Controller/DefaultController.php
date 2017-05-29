<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller {

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request) {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
                    'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
        ]);
    }

    public function loginAction(Request $request) {
        //Recibir un json por post
        $jwt_auth = $this->get("app.jwt_auth");
        $json = $request->request->get('json');
        //$params = json_decode($json);

        if ($json != null) {
            $params = json_decode($json);

            $email = (isset($params->email)) ? $params->email : null;
            $password = (isset($params->password)) ? $params->password : null;
            $getHash = (isset($params->gethash)) ? $params->gethash : null;
            $emailConstraint = new Assert\Email();
            $emailConstraint->message = "This email is not valid !!";
            $validate_email = $this->get("validator")->validate($email, $emailConstraint);

            $pwd = hash('sha256',$password);
            if (count($validate_email) == 0 && $password != null) {

                if ($getHash == null) {
                    $signup = $jwt_auth->signup($email, $pwd);
                } else {
                    $signup = $jwt_auth->signup($email, $pwd, true);
                }
                return new JsonResponse($signup);
                //echo "Data success!!";
            } else {
                return $this->json(array(
                            "status" => "error",
                            "data" => "Login not valid!"
                ));
            }
        } else {
            return $this->json(array(
                        "status" => "error",
                        "data" => "Send json with post!"
            ));
        }
    }

    public function pruebasAction(Request $request) {

        $em = $this->getDoctrine()->getManager();
        $jwt_auth = $this->get("app.jwt_auth");
        $hash = $request->get('authorization', null);
        $check =  $jwt_auth->checkToken($hash, true);
      
        
        var_dump($check);
        die();
        /*$users = $em->getRepository('BackendBundle:User')->findAll();
        $pruebas = array("id" => 1, "nombre" => "Jose");
        // replace this example code with whatever you need*/
       // return $this->json($users);
    }

    
}
